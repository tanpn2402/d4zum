// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getById, validatePassword } from "@services/graphql/api/User.api"
import { getCookie, setCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IUser from "@interfaces/IUser"
import { LoggerManager } from "@utils/logger"

const LOGGER = LoggerManager.getLogger(__filename)

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

function validateReqBody(body: LoginReqBody) {
  if (body.username.length < 6 || body.password.length < 8)
    return false
  if (body.username.includes("@"))
    if (body.username.split("@")[0].length < 4)
      return false
  return true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const body: LoginReqBody = req.body;
    LOGGER.info("Req login", body)

    // validate
    if (!validateReqBody(body)) {
      res.redirect(302, "/login?error=PleaseInsertRightValues");
      return
    }
    // validate done

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
        const user: IUser = await getById(resp.data?.user?.data.id)

        const jwtData: IJwtAuthenticateData = {
          id: resp.data?.user?.data?.id,
          email: resp.data?.user?.data?.email,
          picture: user.picture,
          name: user.name,
          username: resp.data?.user?.data?.username,
          groups: user.groups
        }

        const jwtToken = JWT.sign(jwtData, process.env.JWT_SECRET_KEY, {
          expiresIn: "30d"
        })

        LOGGER.info("Logged user", user, "token", jwtToken)
        // cookies are valid in 30d
        setCookie("jwt", jwtToken, { req, res, maxAge: 30 * 24 * 60 * 60 })
        setCookie("secret", resp.data?.user?.jwt, { req, res, maxAge: 30 * 24 * 60 * 60 })
        res.redirect(302, body.cbUrl || "/");
      }
    }
  }
  else {
    res.redirect(302, "/login?error=MethodNotAllowed");
  }
}
