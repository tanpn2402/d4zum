// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import IUser from "@interfaces/IUser";
import { get } from "@services/graphql/api/Post.api";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import ws from "lib/ws"
import { EWSError, EWSNotiType } from "lib/ws/enum";
import type { NextApiRequest, NextApiResponse } from 'next'

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
    let pubsub = await ws.getPubsubToken(user)
    if (!pubsub.error) {
      let topic = await ws.getTopic(pubsub, type)
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
        let joinResp = await ws.join(pubsub)
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, type } = req.query, promises: Promise<IWSData>[] = [], wsTypes: EWSNotiType[] = []

  if (type) {
    type.toString().split(",").forEach(type => {
      wsTypes.push(type as EWSNotiType)
    })
  }

  console.log("wsTypes", wsTypes);
  if (wsTypes.length === 0 || (wsTypes.includes(EWSNotiType.POST) && url)) {
    if (url.toString().trim().indexOf("/p/") === 0) {
      // post
      const posts = await get({ slug: url.toString().replace("/p/", "") })

      console.log(posts);
      if (posts && posts.length) {
        promises.push(pubsub(posts[0].user, EWSNotiType.POST))
      }
    }
  }

  const jwtToken = getCookie("jwt", { req, res })?.toString()
  if (wsTypes.length === 0 || (wsTypes.includes(EWSNotiType.NOTIFICATION) && ws && jwtToken)) {
    const jwtData: IJwtAuthenticateData = jwtDecode(jwtToken.toString())
    // @ts-ignore ignore-missing-not-optional-properties
    const user: IUser = {
      email: jwtData.email,
      username: jwtData.username,
      name: jwtData.name,
    }
    promises.push(pubsub(user, EWSNotiType.NOTIFICATION))
  }

  Promise.all(promises)
    .then(values => {
      res.status(200).send({
        data: values
      })
    })
    .catch(error => {
      res.status(500).send({
        error: error.message
      })
    })
}

export const config = {
  api: {
    externalResolver: true,
  },
}
