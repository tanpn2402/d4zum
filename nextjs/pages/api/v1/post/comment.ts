// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import { create } from "@services/graphql/api/Comment.api"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IComment from "@interfaces/IComment"

type Data = {
  error?: string,
  data?: IComment
}

type CreateCommentReqBody = {
  content: string
  postId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/json") {
    const body: CreateCommentReqBody = req.body;
    console.log("Req create comment", body);
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
        let resp = await create({
          userId: validateTokenResp.data.id,
          content: body.content,
          postId: body.postId,
          is_blocked: false
        })

        if (resp) {
          res.status(200).send({ data: resp });
        }
        else {
          res.status(500).send({ error: "InternalError" });
        }
      }
    }
    else {
      res.redirect(302, "/login?error=PleaseRelogin");
    }
  }
  else {
    res.status(405).send({ error: "MethodNotAllowed" });
  }
}
