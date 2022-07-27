// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

type LogoutReqBody = {
  csrf: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const body: LogoutReqBody = req.body;
    console.log("Req logout", body.csrf);
    const token = getCookie("token", { req, res })
    if (token !== body.csrf) {
      res.redirect(302, "/register?error=PerrmissionDenied");
    }
    else {
      deleteCookie("jwt", { req, res })
      res.redirect(302, "/")
    }
  }
  else {
    res.redirect(302, "/register?error=MethodNotAllowed");
  }
}
