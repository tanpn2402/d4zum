// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import { create } from "@services/graphql/api/Tag.api"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import ITag from "@interfaces/ITag"

type Data = {
  error?: string,
  data?: ITag[]
}

type CreateTagReqBody = {
  names: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/json") {
    const body: CreateTagReqBody = req.body;
    console.log("Req create tag", body);
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
      else if (body.names.length > 0) {
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
      res.redirect(302, "/login?error=PleaseRelogin");
    }
  }
  else {
    res.status(405).send({ error: "MethodNotAllowed" });
  }
}
