// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get, remove, create } from "@services/graphql/api/Reaction.api"
import IReaction from "@interfaces/IReaction"
import WsEvent from "enums/WsEvent"
import BaseApiHandler from "@lib/http/BaseApiHandler"
import { EWSNotiType } from "@lib/ws/enum"
import { IWSNotification } from "@lib/ws/interfaces"
import { LoggerManager } from "@utils/logger"
import { IApiRequest, IApiResponse } from "@lib/http/interfaces"
import BaseApiRouting from "@lib/http/BaseApiRouting"

const LOGGER = LoggerManager.getLogger(__filename)
class ReactionApiHandler extends BaseApiHandler<IReaction> {
  constructor(req: IApiRequest, res: IApiResponse) {
    super(req, res)
    LOGGER.info("ReactionApiHandler constructor")
  }

  public async post() {
    if (this.req.headers["content-type"] === "application/json") {
      const body = this.req.body as {
        postId: string
      } & IReaction

      LOGGER.info("POST", this.req.seq, body)

      let reactions = await get({
        // @ts-ignore
        user: { id: this.req.jwt.id },
        // @ts-ignore
        post: { id: body.postId }
      })

      let isRemove = reactions?.filter?.(el => el.type === body.type)?.length > 0,
        isChange = reactions.length > 0 && !isRemove

      Promise.all(reactions?.map?.(el => remove(el)))

      // Create new reaction
      if (!isRemove) {
        let resp = await create({
          // @ts-ignore
          user: { id: this.req.jwt.id },
          // @ts-ignore
          post: { id: body.postId },
          type: body.type
        })

        if (resp) {
          // send notification
          if (isChange) {
            this.sendNotification(WsEvent.POST_REACTION_CHANGED, resp)
          }
          else {
            this.sendNotification(WsEvent.POST_REACTION_CREATED, resp)
          }
        }
        return resp
      }
      else {
        reactions.forEach(reaction => {
          this.sendNotification(WsEvent.POST_REACTION_CHANGED, reaction)
        })
        return {} as IReaction
      }
    }
    else {
      return null
    }
  }

  public async get() {
    const query = this.req.query as {
      postId: string
    }

    LOGGER.info("GET", this.req.seq, query)
    if (query.postId && query.postId.toString().trim() !== "") {
      let resp = await get({
        // @ts-ignore
        post: { id: query.postId }
      })
      return resp
    }
    else {
      return null
    }
    // return null
  }


  public sendNotification(event: WsEvent, value?: IReaction): void {
    const notifications: IWSNotification[] = []
    switch (event) {
      case WsEvent.POST_REACTION_CREATED: {
        if (this.req.jwt?.id !== value?.post?.user?.id) {
          notifications.push({
            content: JSON.stringify({
              event: event,
              value: value.id,
              content: `${value.post?.user?.name} đã tương tác với bài viết ${value.post?.title}`,
              href: `/p/${value.post?.slug}`
            }),
            // @ts-ignore
            targetUser: {
              email: value.post?.user?.email
            },
            id: null,
            topic_id: null,
            account_id: null,
            type: EWSNotiType.NOTIFICATION,
            event: event,
            value: value
          })
        }
      }
      case WsEvent.POST_REACTION_CHANGED: {
        notifications.push({
          content: JSON.stringify({
            event: event,
            value: value
          }),
          // @ts-ignore
          targetUser: {
            email: value.post?.user?.email
          },
          id: null,
          topic_id: null,
          account_id: null,
          type: EWSNotiType.POST,
          event: event,
          value: value
        })
        break
      }
      default: {
        console.error("NoWsHandlerImplemented", event)
      }
    }

    notifications.forEach(noti => this.ws?.sendNotification?.(noti)?.then?.(response => {
      LOGGER.info("wsSendResp", response)
    }))
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default (new BaseApiRouting(ReactionApiHandler))
  .withJwt({
    ignoreMethods: ["GET"]
  })
  .getHandler()