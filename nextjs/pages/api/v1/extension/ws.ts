// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import IUser from "@interfaces/IUser";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import ws from "lib/ws"
import { EWSError } from "lib/ws/interfaces";
import type { NextApiRequest, NextApiResponse } from 'next'

interface IWebsocket {
  url: String,
  channelToken: String,
  provider?: String,
  type?: String,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwtToken = getCookie("jwt", { req, res })?.toString()
  if (ws && jwtToken) {
    const jwtData: IJwtAuthenticateData = jwtDecode(jwtToken.toString())
    // @ts-ignore ignore-missing-not-optional-properties
    const user: IUser = {
      email: jwtData.email,
      username: jwtData.username,
      name: jwtData.name,
    }
    let pubsub = await ws.getPubsubToken(user)
    if (!pubsub.error) {
      let topic = await ws.getTopic(pubsub.source_id)
      if (!topic.error) {
        res.status(200).send({
          data: {
            topic: {
              id: topic.id,
              messages: topic.messages
            },
            url: pubsub.url,
            source_id: pubsub.source_id,
            pubsub_token: pubsub.pubsub_token
          }
        })
      }
      else if (topic.error === EWSError.NO_TOPIC.toString()) {
        let joinResp = await ws.join(pubsub.source_id)
        if (!joinResp.error) {
          res.status(200).send({
            data: {
              topic: {
                id: joinResp.id,
                messages: []
              },
              source_id: pubsub.source_id,
              pubsub_token: pubsub.pubsub_token
            }
          })
        }
      }
      else {
        res.status(500).send({
          error: topic.error
        })
      }
    }
    else {
      res.status(500).send({
        error: pubsub.error
      })
    }
  }
  else {
    res.status(500).send({ ok: 1 })
  }
}
