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

function validateReqBody(body: RegisterReqBody) {
  if (body.name.length < 6 || body.username.length < 6 || body.password.length < 8)
    return false
  if (!body.email.includes("@") || body.email.split("@")[0].length < 4)
    return false
  return true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const body: RegisterReqBody = req.body;
    console.log("Req register", body);

    // validate
    if (!validateReqBody(body)) {
      res.redirect(302, "/signup?error=PleaseInsertRightValues");
      return
    }
    // validate done

    const token = getCookie("token", { req, res })
    if (token !== body.csrf) {
      res.redirect(302, "/signup?error=PerrmissionDenied");
    }
    else {
      let resp = await create({
        password: body.password,
        username: body.username,
        email: body.email,
        name: body.name
      })

      if (!resp) {
        res.redirect(302, "/signup?error=EmailOrUsernameIsAlreadyTaken");
      }
      else {
        const jwtData: IJwtAuthenticateData = {
          id: resp.id,
          email: resp?.email,
          picture: resp?.picture,
          name: resp?.name,
          username: resp?.username
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
    res.redirect(302, "/signup?error=MethodNotAllowed");
  }
}
