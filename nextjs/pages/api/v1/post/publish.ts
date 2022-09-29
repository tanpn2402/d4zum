// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get, publish } from "@services/graphql/api/Post.api"
import IPost from "@interfaces/IPost"
import BaseApiHandler from "@lib/http/BaseApiHandler"
import WsEvent from "enums/WsEvent"
import PublicationState from "enums/PublicationState"
import BaseApiRouting from "@lib/http/BaseApiRouting"
import { LoggerManager } from "@utils/logger"

const LOGGER = LoggerManager.getLogger(__filename)

class PushlishApiHandler extends BaseApiHandler<IPost> {

  public async post(): Promise<number | IPost> {
    const body = this.req.body as IPost;
    LOGGER.info("POST", body);
    let posts = await get({ slug: body.slug, state: PublicationState.PREVIEW })
    if (posts?.length === 0) {
      posts = await get({ slug: body.slug, state: PublicationState.LIVE })
    }

    if (posts?.length === 0) {
      return 404
    }
    if (posts[0].user?.id !== this.req.jwt?.id) {
      return 403
    }
    let resp = await publish({
      slug: body.slug
    })
    return resp
  }

  public sendNotification(event: WsEvent, value?: IPost): void {

  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default (new BaseApiRouting(PushlishApiHandler))
  .withJwt()
  .getHandler()