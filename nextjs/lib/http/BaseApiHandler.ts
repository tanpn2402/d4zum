import { IWebsocket } from "@lib/ws/interfaces"
import { LoggerManager } from "@utils/logger"
import SequenceManager from "@utils/sequence"
import WsEvent from "enums/WsEvent"
import { IApiRequest, IApiResponse } from "./interfaces"

const LOGGER = LoggerManager.getLogger(__filename)

export default abstract class BaseApiHandler<T> {
  protected req: IApiRequest
  protected res: IApiResponse
  protected ws: IWebsocket

  constructor(req: IApiRequest, res: IApiResponse) {
    this.req = req
    this.res = res
  }

  public withWs(ws: IWebsocket): BaseApiHandler<T> {
    this.ws = ws
    return this
  }

  public async post(): Promise<T | number> {
    return null
  }

  public async get(): Promise<T | T[] | number> {
    return null
  }

  public async delete(): Promise<T | number> {
    return null
  }

  public async put(): Promise<T | number> {
    return null
  }

  public returnError(statusCode: number, errorMessage?: string): void {
    switch (statusCode) {
      case 403:
        this.res.status(statusCode).send({ error: errorMessage || "PermissionDenied" })
        break
      case 404:
        this.res.status(statusCode).send({ error: errorMessage || "NotFound" })
        break
      case 405:
        this.res.status(statusCode).send({ error: errorMessage || "MethodNotAllowed" })
        break
      default:
        this.res.status(statusCode).send({ error: errorMessage || "InternalError" })
        break
    }
  }

  public returnData(data: any) {
    if (!this.res.writableFinished) {
      this.res.status(200).send({ data: data })
      LOGGER.info(this.req.method, this.req.seq, "Data has been returned!")
    }
    else {
      LOGGER.error(this.req.method, this.req.seq, "Response has been finished!")
    }
  }

  public abstract sendNotification(event: WsEvent, value?: T): void

  public async execute(): Promise<void> {
    // set req
    this.req.seq = SequenceManager.getSeq()

    let resp: T | T[] | number = null
    if (this.req.method === "POST") {
      resp = await this.post()
    }
    else if (this.req.method === "GET") {
      resp = await this.get()
    }
    else if (this.req.method === "DELETE") {
      resp = await this.delete()
    }
    else if (this.req.method === "PUT") {
      resp = await this.put()
    }

    if (Number.isInteger(resp)) {
      this.returnError(resp as number)
    }
    else if (resp) {
      this.returnData(resp)
    }
    else {
      this.returnError(500)
    }
  }
}