import IUser from "@interfaces/IUser"
import WsEvent from "enums/WsEvent"
import { EWSNotiType } from "./enum"

interface IWSError {
  error?: string
  error_code?: string
}

interface IWSUser extends IWSError {
  source_id: string
  email?: string
  name?: string
  phone_number?: string
  id?: string
}

interface IPubSubToken extends IWSError, IWSUser {
  pubsub_token: string
  url: string
}

interface ITopic extends IWSError {
  id: string,
  messages?: any[]
}

interface IWSNotification extends IWSError {
  id: string
  topic_id: string
  account_id?: string     // agent/admin account-id
  content: string
  targetUser: IUser
  type: EWSNotiType
  event: WsEvent
  value?: any
}

interface IWebsocket {
  getUserToken(email: string): Promise<IWSUser>
  getPubsubToken(user?: IUser): Promise<IPubSubToken>
  getTopic(pubsub: IPubSubToken, wsNotiType: EWSNotiType): Promise<ITopic>
  join(pubsub?: IPubSubToken): Promise<ITopic>
  sendNotification(message: IWSNotification): Promise<IWSNotification>
}

export type {
  IWebsocket,
  IPubSubToken,
  ITopic,
  IWSNotification,
  IWSUser
}