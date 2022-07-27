// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getById, validatePassword } from "@services/graphql/api/User.api"
import { getCookie, setCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IUser from "@interfaces/IUser"

type Data = {
  name: string
}

type LoginReqBody = {
  username: string
  password: string
  is_remember: string
  csrf: string
  cbUrl?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const body: LoginReqBody = req.body;
    console.log("Req login", body);
    const token = getCookie("token", { req, res })
    if (token !== body.csrf) {
      res.redirect(302, "/login?error=PerrmissionDenied&username=" + body.username);
    }
    else {
      let resp = await validatePassword({
        password: body.password,
        username: body.username
      })

      if (resp.errors) {
        res.redirect(302, "/login?error=InvalidIdentifierOrPassword&username=" + body.username);
      }
      else {
        const user: IUser = await getById(resp.data.user.user.id)

        const jwtData: IJwtAuthenticateData = {
          id: resp.data.user.user.id,
          email: resp.data.user.user.email,
          picture: user.picture,
          name: user.name,
          username: resp.data.user.user.username
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
    res.redirect(302, "/login?error=MethodNotAllowed");
  }
}
