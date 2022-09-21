import { IWebsocket } from './interfaces'
import ChatwootWS from './chatwoot'

let ws: IWebsocket = null

switch (process.env.WS_PROVIDER) {
  case "CHATWOOT": {
    ws = new ChatwootWS()
  }
  default: {
    console.error("No WS defined")
  }
}

export default ws