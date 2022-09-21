import IComment from "@interfaces/IComment";
import IReaction from "@interfaces/IReaction";
import ws from "@lib/ws";
import WsEvent from "enums/WsEvent";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiRequest } from "../interfaces";


function sendEventPOST_REACTION(event: WsEvent, data: IReaction) {
  ws?.sendNotification?.({
    content: JSON.stringify({
      event: event,
      value: data.type,
      content: `${data.user.name} đã tương tác với bài viết ${data.post.title}`,
      href: `/p/${data.post.slug}`
    }),
    targetUserEmail: data.post?.user?.email,
    id: null,
    topic_id: null,
    account_id: null
  })
}

function sendEventCOMMENT_CREATED(event: WsEvent, data: IComment) {
  ws?.sendNotification?.({
    content: JSON.stringify({
      event: event,
      value: data.id,
      content: `${data.user.name} đã bình luận bài viết ${data.post.title}: ${data.content}`,
      href: `/p/${data.post.slug}`
    }),
    targetUserEmail: data.post?.user?.email,
    id: null,
    topic_id: null,
    account_id: null
  })
}

const withWs = (next: (req: IApiRequest, res: NextApiResponse) => any) => {
  return (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    res.addListener("finish", () => {
      let wsData = (req as IApiRequest).wsData
      if (wsData) {
        switch (wsData.event) {
          case WsEvent.POST_REACTION: {
            sendEventPOST_REACTION(wsData.event, wsData.value)
            break
          }
          case WsEvent.COMMENT_CREATED: {
            sendEventCOMMENT_CREATED(wsData.event, wsData.value)
            break
          }
          default: {
            console.error("NoWsHandlerImplemented", wsData.event)
          }
        }
      }
    })
    return next(req, res)
  }
}

export default withWs