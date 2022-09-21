// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from "@services/graphql/api/Tag.api"
import ITag from "@interfaces/ITag"
import withJwt from "@lib/http/helpers/withJwt"

type Data = {
  error?: string,
  data?: ITag[]
}

type CreateTagReqBody = {
  names: string[]
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/json") {
    const body: CreateTagReqBody = req.body;
    console.log("Req create tag", body);
    if (body.names.length > 0) {
      let resp = await create({
        names: body.names
      })

      if (resp) {
        res.status(200).send({ data: resp });
      }
      else {
        res.status(500).send({ error: "InternalError" });
      }
    }
    else {
      res.status(200).send({ data: [] as ITag[] });
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