// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import { get, remove, create } from "@services/graphql/api/Reaction.api"
import ReactionType from "enums/ReactionType"
import IReaction from "@interfaces/IReaction"
import WsEvent from "enums/WsEvent"
import withJwt from "@lib/http/helpers/withJwt"
import withWs from "@lib/http/helpers/withWs"
import { IApiRequest } from "@lib/http/interfaces"

type Data = {
  error?: string,
  data?: IReaction[]
}

type ToggleReactionReqBody = {
  type: ReactionType
  postId: string
}

async function handler(
  req: IApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/json") {
    const body: ToggleReactionReqBody = req.body;
    console.log("Req toggle reaction", body);
    let reactions = await get({
      // @ts-ignore
      user: { id: req.jwt.id },
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
      let resp = await create({
        // @ts-ignore
        user: { id: req.jwt.id },
        // @ts-ignore
        post: { id: body.postId },
        type: body.type
      })

      if (resp) {
        res.status(200).send({ data: [resp] });
        // send notification
        if (resp.post?.user?.email !== resp.user.email) {
          req.wsData = {
            event: WsEvent.POST_REACTION,
            value: resp
          }
        }
      }
      else {
        res.status(500).send({ error: "InternalError" });
      }
    }
    else {
      res.status(200).send({ data: toggledReactions })
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

export const config = {
  api: {
    externalResolver: true,
  },
}

export default withJwt(withWs(handler), {
  ignoreMethods: ["GET"]
})