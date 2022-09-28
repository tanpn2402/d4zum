import IComment from "@interfaces/IComment";
import IReaction from "@interfaces/IReaction";
import ws from "@lib/ws";
import { EWSNotiType } from "@lib/ws/enum";
import WsEvent from "enums/WsEvent";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiRequest } from "../interfaces";


function sendEventPOST(event: WsEvent, data: IReaction, type: EWSNotiType) {
  ws?.sendNotification?.({
    content: JSON.stringify({
      event: event,
      value: data.type,
      content: `${data.user.name} đã tương tác với bài viết ${data.post.title}`,
      href: `/p/${data.post.slug}`
    }),
    // @ts-ignore
    targetUser: {
      email: data.post?.user?.email
    },
    id: null,
    topic_id: null,
    account_id: null,
    type: type,
    event: event,
    value: data
  })?.then?.(response => {
    console.log("wsSendResp", response)
  })
}

function sendEventCOMMENT(event: WsEvent, data: IComment, type: EWSNotiType) {
  ws?.sendNotification?.({
    content: JSON.stringify({
      event: event,
      value: data.id,
      content: `${data.user.name} đã bình luận bài viết ${data.post.title}: ${data.content}`,
      href: `/p/${data.post.slug}`
    }),
    // @ts-ignore
    targetUser: {
      email: data.post?.user?.email
    },
    id: null,
    topic_id: null,
    account_id: null,
    type: type,
    event: event,
    value: data
  })?.then?.(response => {
    console.log("wsSendResp", response)
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
          case WsEvent.POST_REACTION_CREATED: {
            sendEventPOST(wsData.event, wsData.value, EWSNotiType.POST)
            sendEventPOST(wsData.event, wsData.value, EWSNotiType.NOTIFICATION)
            break
          }
          case WsEvent.COMMENT_DELETED: {
            sendEventCOMMENT(wsData.event, wsData.value, EWSNotiType.POST)
            break
          }
          case WsEvent.COMMENT_CREATED: {
            sendEventCOMMENT(wsData.event, wsData.value, EWSNotiType.POST)
            sendEventCOMMENT(wsData.event, wsData.value, EWSNotiType.NOTIFICATION)
            break;
          }
          case WsEvent.COMMENT_UPDATED: {
            sendEventCOMMENT(wsData.event, wsData.value, EWSNotiType.POST)
            break;
          }
          case WsEvent.COMMENT_DELETED: {
            sendEventCOMMENT(wsData.event, wsData.value, EWSNotiType.POST)
            break;
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