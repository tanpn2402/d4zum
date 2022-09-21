import IUser from "@interfaces/IUser"

interface IWSError {
  error?: string
  error_code?: string
}

interface IPubSubToken extends IWSError {
  pubsub_token: string
  source_id: string
  url: string
}

interface ITopic extends IWSError {
  id: string,
  messages?: any[]
}

interface IWebsocket {
  getPubsubToken(user?: IUser): Promise<IPubSubToken>
  getTopic(source_id?: string): Promise<ITopic>
  join(source_id?: string): Promise<ITopic>
}

enum EWSError {
  NO_TOPIC = "NO_TOPIC"
}

export type {
  IWebsocket,
  IPubSubToken,
  ITopic
}

export {
  EWSError
}