// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import { create, update } from "@services/graphql/api/Post.api"
import { get as getTags, create as createTags } from "@services/graphql/api/Tag.api"
import IPost from "@interfaces/IPost"
import ITag from "@interfaces/ITag"
import { IApiRequest } from "@lib/http/interfaces"
import withJwt from "@lib/http/helpers/withJwt"

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

async function handler(
  req: IApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.headers["content-type"] !== "application/json") {
    res.status(405).send({ error: "MethodNotAllowed" });
    return
  }

  if ((req.method === "POST" || req.method === "PUT")) {
    const body: CreatePostReqBody = req.body;
    console.log("Post", req.method, body);

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
        userId: req.jwt.id,
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
        userId: req.jwt.id,
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
  else {
    res.status(405).send({ error: "MethodNotAllowed" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default withJwt(handler)