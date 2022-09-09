// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import { create, update } from "@services/graphql/api/Post.api"
import { get as getTags, create as createTags } from "@services/graphql/api/Tag.api"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IPost from "@interfaces/IPost"
import ITag from "@interfaces/ITag"

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
        let resp: IPost, tags = [] as ITag[];

        if (body.tags && body.tags.length) {
          const existedTags: ITag[] = await getTags({ name: body.tags.map(e => e.trim()) })
          let restTags: string[] = []

          body.tags.forEach(tag => {
            let t = existedTags.filter(el => el.name.trim().toLowerCase() === tag.trim().toLowerCase())
            if (t.length === 0) {
              restTags.push(tag)
            }
            else {
              tags = tags.concat(t)
            }
          })

          if (restTags.length > 0) {
            let t = await createTags({ names: restTags })
            if (t) {
              tags = tags.concat(t)
            }
          }
        }

        if (tags.length > 0) {
          tags = tags.reduce((result: ITag[], tag) => {
            if (result.filter(el => el.name.trim().toLowerCase() === tag.name.trim().toLowerCase()).length === 0) {
              result.push(tag)
            }
            return result
          }, [])
        }

        if (req.method === "POST") {
          resp = await create({
            content: body.content,
            title: body.title,
            userId: validateTokenResp.data.id,
            categories: body.categories,
            tags: tags.map(e => e.id),
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
            tags: tags.map(e => e.id),
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
