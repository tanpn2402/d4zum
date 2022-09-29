import { IWebsocket } from './interfaces'
import ChatwootWS from './chatwoot'
import { LoggerManager } from "@utils/logger";

const LOGGER = LoggerManager.getLogger(__filename)
export default class WsManager {
  private static instance: WsManager
  private ws: IWebsocket = null

  private constructor() {
    LOGGER.info(`Using WS provider = ${process.env.WS_PROVIDER}`)
    switch (process.env.WS_PROVIDER) {
      case "CHATWOOT": {
        this.ws = new ChatwootWS()
        break
      }
      default: {
        LOGGER.error("No WS defined")
      }
    }
  }

  public static getWs(): IWebsocket {
    if (!WsManager.instance) {
      WsManager.instance = new WsManager();
    }
    return this.instance.ws
  }
}