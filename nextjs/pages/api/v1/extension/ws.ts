// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import IUser from "@interfaces/IUser";
import { get } from "@services/graphql/api/Post.api";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import WsManager from "@lib/ws"
import { EWSError, EWSNotiType } from "@lib/ws/enum";
import { LoggerManager } from "@utils/logger";
import BaseApiHandler from "@lib/http/BaseApiHandler";
import WsEvent from "enums/WsEvent";
import BaseApiRouting from "@lib/http/BaseApiRouting";

const LOGGER = LoggerManager.getLogger(__filename)

interface IWSData {
  url: string,
  topic: {
    id: string
    messages: any[]
  },
  source_id: string
  pubsub_token: string
  type: EWSNotiType
}

function pubsub(user: IUser, type: EWSNotiType) {
  return new Promise<IWSData>(async (resolve, reject) => {
    let pubsub = await WsManager.getWs().getPubsubToken(user)
    if (!pubsub.error) {
      let topic = await WsManager.getWs().getTopic(pubsub, type)
      if (!topic.error) {
        resolve({
          topic: {
            id: topic.id,
            messages: topic.messages?.filter?.(mes => mes.content_attributes.deleted !== true &&
              mes?.content_type === "text").reverse() || []
          },
          url: pubsub.url,
          source_id: pubsub.source_id,
          pubsub_token: pubsub.pubsub_token,
          type: type
        })

      }
      else if (topic.error === EWSError.NO_TOPIC.toString()) {
        let joinResp = await WsManager.getWs().join(pubsub)
        if (!joinResp.error) {
          resolve({
            topic: {
              id: joinResp.id,
              messages: []
            },
            url: pubsub.url,
            source_id: pubsub.source_id,
            pubsub_token: pubsub.pubsub_token,
            type: type
          })
        }
      }
      else {
        reject(Error(topic.error))
      }
    }
    else {
      reject(Error(pubsub.error))
    }
  })
}

class WebsocketApiHandler extends BaseApiHandler<IWSData> {

  public async get(): Promise<number | IWSData | IWSData[]> {
    const { url, type } = this.req.query as { url: string, type: string },
      promises: Promise<IWSData>[] = [],
      wsTypes: EWSNotiType[] = []

    if (type) {
      type.toString().split(",").forEach(type => {
        wsTypes.push(type as EWSNotiType)
      })
    }


    let jwtData = {} as IJwtAuthenticateData, jwtToken = getCookie("jwt", { req: this.req, res: this.res })?.toString()
    if (jwtToken) {
      jwtData = jwtDecode(jwtToken.toString())
    }

    if (wsTypes.length === 0 || (wsTypes.includes(EWSNotiType.POST) && url)) {
      if (url.toString().trim().indexOf("/p/") === 0) {
        // post
        const posts = await get({
          slug: url.toString().replace("/p/", ""),
          groupIds: jwtData?.groups?.map?.(group => group.id)
        })
        if (posts && posts.length) {
          promises.push(pubsub(posts[0].user, EWSNotiType.POST))
        }
      }
    }

    if (wsTypes.length === 0 || (wsTypes.includes(EWSNotiType.NOTIFICATION) && WsManager.getWs() && jwtData?.id)) {
      // @ts-ignore ignore-missing-not-optional-properties
      const user: IUser = {
        email: jwtData.email,
        username: jwtData.username,
        name: jwtData.name,
      }
      promises.push(pubsub(user, EWSNotiType.NOTIFICATION))
    }

    let resp = await new Promise<number | IWSData[]>(resolve => {
      Promise.all(promises)
        .then(values => {
          resolve(values)
        })
        .catch(error => {
          LOGGER.error(error)
          resolve(500)
        })
    })
    return resp
  }

  public sendNotification(event: WsEvent, value?: IWSData): void {

  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default (new BaseApiRouting(WebsocketApiHandler))
  .withJwt()
  .getHandler()