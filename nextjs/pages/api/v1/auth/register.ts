// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import { create } from "@services/graphql/api/User.api"
import { getCookie, setCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import { LoggerManager } from "@utils/logger"
import { isInternalIpAddress } from "@utils/helper"

const LOGGER = LoggerManager.getLogger(__filename)

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
    const clientIp = (req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.headers["x-forwarded-host"]) as string,
      host = req.headers["host"] as string
    LOGGER.info("Req register", host, clientIp, body)

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
      let isInternalLocalIp = false
      if (clientIp && isInternalIpAddress(host)) {
        isInternalLocalIp = true
      }

      let resp = await create({
        password: body.password,
        username: body.username,
        email: body.email,
        name: body.name,
        groups: isInternalLocalIp ? (process.env.INTERNAL_GROUP_IDS?.split?.(",") || []) : []
      })

      if (!resp) {
        res.redirect(302, "/signup?error=EmailOrUsernameIsAlreadyTaken");
      }
      else {
        const jwtData: IJwtAuthenticateData = {
          id: resp.data?.id,
          email: resp.data?.email,
          picture: resp.data?.picture,
          name: resp.data?.name,
          username: resp.data?.username,
          groups: resp.data?.groups
        }

        const jwtToken = JWT.sign(jwtData, process.env.JWT_SECRET_KEY, {
          expiresIn: "30d"
        })
        // cookies are valid in 30d
        setCookie("jwt", jwtToken, { req, res, maxAge: 30 * 24 * 60 * 60 })
        setCookie("secret", resp.jwt, { req, res, maxAge: 30 * 24 * 60 * 60 })
        res.redirect(302, body.cbUrl || "/");
      }
    }
  }
  else {
    res.redirect(302, "/signup?error=MethodNotAllowed");
  }
}
