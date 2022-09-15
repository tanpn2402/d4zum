// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import { get, remove, create } from "@services/graphql/api/Reaction.api"
import ReactionType from "enums/ReactionType"
import IReaction from "@interfaces/IReaction"

type Data = {
  error?: string,
  data?: IReaction[]
}

type ToggleReactionReqBody = {
  type: ReactionType
  postId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/json") {
    const body: ToggleReactionReqBody = req.body;
    console.log("Req toggle reaction", body);
    const jwtToken = getCookie("jwt", { req, res })?.toString()
    if (jwtToken) {
      let validateTokenResp = await new Promise<{ error?: any, data?: IJwtAuthenticateData }>(async resolve => {
        JWT.verify(jwtToken, process.env.JWT_SECRET_KEY, async function (error, decoded: IJwtAuthenticateData) {
          if (error) {
            console.error(error);
            resolve({ error })
          }
          else {
            resolve({ data: decoded })
          }
        });
      })

      if (validateTokenResp.error) {
        res.redirect(302, "/login?error=PleaseRelogin");
      }
      else {
        let reactions = await get({
          // @ts-ignore
          user: { id: validateTokenResp.data.id },
          // @ts-ignore
          post: { id: body.postId }
        })

        let isToggle = false, toggledReactions: IReaction[] = []
        if (reactions?.length) {
          // Remove old reactions
          while (reactions.length) {
            let reaction = reactions.pop()
            if (reaction.type === body.type) {
              isToggle = true
              toggledReactions.push(reaction)
            }
            await remove(reaction)
          }
        }

        // Create new reaction
        if (!isToggle) {
          let createReactionResp = await create({
            // @ts-ignore
            user: { id: validateTokenResp.data.id },
            // @ts-ignore
            post: { id: body.postId },
            type: body.type
          })

          if (createReactionResp) {
            res.status(200).send({ data: [createReactionResp] });
          }
          else {
            res.status(500).send({ error: "InternalError" });
          }
        }
        else {
          res.status(200).send({ data: toggledReactions })
        }
      }
    }
    else {
      res.redirect(302, "/login?error=PleaseRelogin");
    }
  }
  else if (req.method === "GET") {
    if (req.query.postId && req.query.postId.toString().trim() !== "") {
      let getReactionResp = await get({
        // @ts-ignore
        post: { id: req.query.postId.toString().trim() }
      })

      if (getReactionResp) {
        res.status(200).send({ data: getReactionResp });
      }
      else {
        res.status(500).send({ error: "InternalError" });
      }
    }
    else {
      res.status(500).send({ error: "InternalError" });
    }

  }
  else {
    res.status(405).send({ error: "MethodNotAllowed" });
  }
}
