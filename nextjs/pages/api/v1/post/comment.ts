// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import { create } from "@services/graphql/api/Comment.api"
import IComment from "@interfaces/IComment"
import WsEvent from "enums/WsEvent"
import withJwt from "@lib/http/helpers/withJwt"
import { IApiRequest } from "@lib/http/interfaces"
import withWs from "@lib/http/helpers/withWs"

type Data = {
  error?: string,
  data?: IComment
}

type CreateCommentReqBody = {
  content: string
  postId: string
}

async function handler(
  req: IApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/json") {
    const body: CreateCommentReqBody = req.body;
    console.log("Req create comment", body);

    let resp = await create({
      userId: req.jwt.id,
      content: body.content,
      postId: body.postId,
      is_blocked: false
    })

    if (resp) {
      res.status(200).send({ data: resp })

      // send notification
      if (resp.post?.user?.email !== resp.user.email) {
        req.wsData = {
          event: WsEvent.COMMENT_CREATED,
          value: resp
        }
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

export default withJwt(withWs(handler))