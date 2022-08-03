// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import { create, update } from "@services/graphql/api/Post.api"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IPost from "@interfaces/IPost"

type Data = {
  error?: string,
  data?: IPost[]
}

type CreatePostReqBody = {
  id?: string
  title: string
  content: string
  categories: string[]
  tags: string[]
  asDraft?: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.headers["content-type"] !== "application/json") {
    res.status(405).send({ error: "MethodNotAllowed" });
    return
  }

  if ((req.method === "POST" || req.method === "PUT")) {
    const body: CreatePostReqBody = req.body;
    console.log("Post", req.method, body);
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
        let resp: IPost;

        if (req.method === "POST") {
          if (body.asDraft) {
            
          }
          resp = await create({
            content: body.content,
            title: body.title,
            userId: validateTokenResp.data.id,
            categories: body.categories,
            tags: body.tags,
            asDraft: body.asDraft
          })
        }
        else {
          resp = await update({
            id: body.id,
            content: body.content,
            title: body.title,
            userId: validateTokenResp.data.id,
            categories: body.categories,
            tags: body.tags
          })
        }

        if (resp) {
          res.status(200).send({ data: [resp] });
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
