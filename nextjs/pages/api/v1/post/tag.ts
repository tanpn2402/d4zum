// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { create } from "@services/graphql/api/Tag.api"
import ITag from "@interfaces/ITag"
import BaseApiHandler from "@lib/http/BaseApiHandler"
import WsEvent from "enums/WsEvent"
import BaseApiRouting from "@lib/http/BaseApiRouting"
import { LoggerManager } from "@utils/logger"

const LOGGER = LoggerManager.getLogger(__filename)
class TagApiHandler extends BaseApiHandler<ITag[]> {

  public async post(): Promise<number | ITag[]> {
    const body = this.req.body as {
      names: string[]
    };
    LOGGER.info("POST", body);
    if (body.names.length > 0) {
      let resp = await create({
        names: body.names
      })

      return resp
    }
    else {
      return []
    }
  }

  public sendNotification(event: WsEvent, value?: ITag[]): void {

  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default (new BaseApiRouting(TagApiHandler))
  .withJwt()
  .getHandler()