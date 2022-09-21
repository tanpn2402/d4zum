// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { publish } from "@services/graphql/api/Post.api"
import IPost from "@interfaces/IPost"
import withJwt from "@lib/http/helpers/withJwt"

type Data = {
  error?: string,
  data?: IPost
}

type TogglePublishReqBody = {
  id?: string
  slug: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/json") {
    const body: TogglePublishReqBody = req.body;
    console.log("TogglePublishReqBody", body);
    let resp = await publish({
      slug: body.slug
    })

    if (resp) {
      res.status(200).send({ data: resp });
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