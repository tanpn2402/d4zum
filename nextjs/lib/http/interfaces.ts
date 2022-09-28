import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import WsEvent from "enums/WsEvent";
import { NextApiRequest, NextApiResponse } from "next";

interface IApiRequest extends NextApiRequest {
  seq?: number
  jwt?: IJwtAuthenticateData
  wsData?: {
    event: WsEvent
    value: any
  }
}
interface IApiResponse extends NextApiResponse {

}


export type {
  IApiRequest,
  IApiResponse
}