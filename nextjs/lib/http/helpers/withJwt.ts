import JWT from "jsonwebtoken"
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import { IApiRequest } from "../interfaces";

type WithJwtOptions = {
  ignoreMethods: string[]
}

const withJwt = (next: (req: IApiRequest, res: NextApiResponse) => Promise<any>, options?: WithJwtOptions) => {
  return (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    if (options) {
      if (options.ignoreMethods.includes(req.method)) {
        return next(req, res)
      }
    }
    const jwtToken = getCookie("jwt", { req, res })?.toString()
    if (jwtToken) {
      JWT.verify(jwtToken, process.env.JWT_SECRET_KEY, async function (error, decoded: IJwtAuthenticateData) {
        if (error) {
          console.error(error)
          res.status(403).send({ error: "PermissionDenied" })
        }
        else {
          (req as IApiRequest).jwt = decoded
          return next(req, res)
        }
      });
    }
    else {
      res.status(403).send({ error: "PermissionDenied" })
    }
  }
}

export default withJwt