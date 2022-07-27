// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import { create } from "@services/graphql/api/User.api"
import { getCookie, setCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"

type Data = {
  name: string
}

type RegisterReqBody = {
  name: string
  username: string
  password: string
  email: string
  csrf: string
  cbUrl?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const body: RegisterReqBody = req.body;
    console.log("Req register", body.username, body.password);
    const token = getCookie("token", { req, res })
    if (token !== body.csrf) {
      res.redirect(302, "/register?error=PerrmissionDenied");
    }
    else {
      let resp = await create({
        password: body.password,
        username: body.username,
        email: body.email,
        name: body.name
      })

      if (resp.errors) {
        res.redirect(302, "/register?error=EmailOrUsernameIsAlreadyTaken");
      }
      else {
        const jwtData: IJwtAuthenticateData = {
          id: resp.data.user.user?.id,
          email: resp.data.user.user?.attributes?.email,
          picture: resp.data.user.user?.attributes?.picture?.data?.attributes,
          name: resp.data.user.user?.attributes?.name,
          username: resp.data.user.user?.attributes?.username
        }

        const jwtToken = JWT.sign(jwtData, process.env.JWT_SECRET_KEY, {
          expiresIn: "30d"
        })

        setCookie("jwt", jwtToken, { req, res })
        res.redirect(302, body.cbUrl || "/");
      }
    }
  }
  else {
    res.redirect(302, "/register?error=MethodNotAllowed");
  }
}
