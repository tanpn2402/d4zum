import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import WsEvent from "enums/WsEvent";
import { NextApiRequest } from "next";

interface IApiRequest extends NextApiRequest {
  jwt?: IJwtAuthenticateData
  wsData?: {
    event: WsEvent
    value: any
  }
}

export type {
  IApiRequest
}