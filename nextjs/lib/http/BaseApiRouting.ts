import JWT from "jsonwebtoken"
import { IApiRequest, IApiResponse } from "@lib/http/interfaces"
import ws from "@lib/ws"
import { IWebsocket } from "@lib/ws/interfaces"
import { LoggerManager } from "@utils/logger"
import { getCookie } from "cookies-next"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import BaseApiHandler from "./BaseApiHandler"

const LOGGER = LoggerManager.getLogger(__filename)

type WithJwtOptions = {
  ignoreMethods: string[]
}

export default class BaseApiRouting<I, T extends BaseApiHandler<I>> {
  protected isWithJwt: boolean = false
  protected withJwtOptions: WithJwtOptions
  protected ws: IWebsocket = ws

  constructor(private readonly _createClass: {
    new(req: IApiRequest, res: IApiResponse): T
  }) {
    LOGGER.info("BaseApiRouting constructor!")
  }

  public withJwt(options?: WithJwtOptions): BaseApiRouting<I, T> {
    this.isWithJwt = true
    this.withJwtOptions = options
    return this
  }

  public getHandler() {
    LOGGER.info("BaseApiRouting getHandler!")
    return async (req: IApiRequest, res: IApiResponse) => {
      if (this.isWithJwt && this.withJwtOptions) {
        if (this.withJwtOptions.ignoreMethods.includes(req.method)) {
          return this.next(req, res)
        }
      }

      const jwtToken = getCookie("jwt", { req, res })?.toString?.()
      if (jwtToken) {
        JWT.verify(jwtToken, process.env.JWT_SECRET_KEY, (error, decoded: IJwtAuthenticateData) => {
          if (error) {
            res.status(403).send({ error: "PermissionDenied" })
          }
          else {
            (req as IApiRequest).jwt = decoded
            return this.next(req, res)
          }
        });
      }
      else {
        res.status(403).send({ error: "PermissionDenied" })
      }
    }
  }

  private next(req: IApiRequest, res: IApiResponse) {
    return (new this._createClass(req, res)).withWs(ws).execute()
  }
}