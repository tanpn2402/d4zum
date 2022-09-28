import { IApiRequest, IApiResponse } from "@lib/http/interfaces"
import { create, get, remove, update } from "@services/graphql/api/Comment.api"
import { LoggerManager } from "@utils/logger"
import BaseApiHandler from "@lib/http/BaseApiHandler"
import BaseApiRouting from "@lib/http/BaseApiRouting"
import IComment from "@interfaces/IComment"
import WsEvent from "enums/WsEvent"
import { IWSNotification } from "@lib/ws/interfaces"
import { EWSNotiType } from "@lib/ws/enum"

const LOGGER = LoggerManager.getLogger(__filename)

class CommentApiHandler extends BaseApiHandler<IComment> {
  constructor(req: IApiRequest, res: IApiResponse) {
    super(req, res)
    LOGGER.info("CommentApiHandler constructor")
  }

  public async post(): Promise<IComment | number> {
    if (this.req.headers["content-type"] === "application/json") {
      const body = this.req.body as {
        postId: string
      } & IComment

      LOGGER.info("POST", this.req.seq, body)

      let resp = await create({
        userId: this.req.jwt.id,
        content: body.content,
        postId: body.postId,
        is_blocked: false
      })

      if (resp) {
        this.sendNotification(WsEvent.COMMENT_CREATED, resp)
      }

      return resp
    }
    else {
      return 405
    }
  }

  public async get(): Promise<IComment | IComment[] | number> {
    LOGGER.info("GET", this.req.seq, this.req.query)
    // @ts-ignore
    let reqBody: IComment = {}
    let query = this.req.query as {
      postId?: string
      id?: string
    }

    if (query.id?.trim?.() !== "") {
      reqBody.id = query.id
    }
    if (query.postId?.trim?.() !== "") {
      // @ts-ignore
      reqBody.post = {
        id: query.postId
      }
    }

    if (reqBody.id || reqBody.post.id) {
      let resp = await get(reqBody)
      if (resp?.length === 0) {
        return 404
      }
      else {
        return resp
      }
    }
    else {
      return null
    }
  }

  public async delete(): Promise<IComment | number> {
    let query = this.req.query as {
      id?: string
    }
    LOGGER.info("DELETE", this.req.seq, query)
    if (query.id?.trim?.() !== "") {
      let comments = await this.get() as IComment[]
      if (comments && comments.length) {
        if (comments[0].user?.id === this.req.jwt?.id) {
          // @ts-ignore
          let resp = await remove({
            id: query.id
          })

          if (resp) {
            this.sendNotification(WsEvent.COMMENT_DELETED, comments[0])
          }

          return comments[0]
        }
        else {
          return 403
        }
      }
      else {
        return 404
      }
    }
    else {
      return null
    }
  }

  public async put(): Promise<IComment | number> {
    let query = this.req.query as {
      id?: string
    }
    let body = this.req.body as {
      user: string
      post: string
    } & IComment

    LOGGER.info("PUT", this.req.seq, query, body)
    if (query.id?.trim?.() !== "" && body.content?.trim?.() !== "") {
      let comments = await this.get() as IComment[]
      if (comments && comments.length) {
        if (comments[0].user?.id === this.req.jwt?.id) {
          // @ts-ignore
          let resp = await update({
            id: query.id,
            content: body.content
          })

          if (resp) {
            this.sendNotification(WsEvent.COMMENT_UPDATED, resp)
          }

          return resp
        }
        else {
          return 403
        }
      }
      else {
        return 404
      }
    }
    else {
      return null
    }
  }

  public sendNotification(event: WsEvent, value?: IComment): void {
    const notifications: IWSNotification[] = []
    switch (event) {
      case WsEvent.COMMENT_CREATED: {
        if (this.req.jwt?.id !== value?.post?.user?.id) {
          notifications.push({
            content: JSON.stringify({
              event: event,
              value: value.id,
              content: `${value.post?.user?.name} đã bình luận bài viết ${value.post?.title}: ${value.content}`,
              href: `/p/${value.post?.slug}`
            }),
            // @ts-ignore
            targetUser: {
              email: value.post?.user?.email
            },
            id: null,
            topic_id: null,
            account_id: null,
            type: EWSNotiType.NOTIFICATION,
            event: event,
            value: value
          })
        }
      }
      case WsEvent.COMMENT_DELETED:
      case WsEvent.COMMENT_UPDATED: {
        notifications.push({
          content: JSON.stringify({
            event: event,
            value: value
          }),
          // @ts-ignore
          targetUser: {
            email: value.post?.user?.email
          },
          id: null,
          topic_id: null,
          account_id: null,
          type: EWSNotiType.POST,
          event: event,
          value: value
        })
        break
      }
      default: {
        console.error("NoWsHandlerImplemented", event)
      }
    }

    notifications.forEach(noti => this.ws?.sendNotification?.(noti)?.then?.(response => {
      LOGGER.info("wsSendResp", response)
    }))
  }
}


export const config = {
  api: {
    externalResolver: true,
  },
}

export default (new BaseApiRouting(CommentApiHandler))
  .withJwt({
    ignoreMethods: ["GET"]
  })
  .getHandler()