import { IWebsocket } from './interfaces'
import ChatwootWS from './chatwoot'

let ws: IWebsocket = null

console.log(`Using WS provider = ${process.env.WS_PROVIDER}`);

switch (process.env.WS_PROVIDER) {
  case "CHATWOOT": {
    ws = new ChatwootWS()
    break
  }
  default: {
    console.error("No WS defined")
  }
}

export default ws