import useOnOutsideClick from "@hooks/useOnOutsideClick";
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import { getCookie } from "cookies-next"
import jwtDecode from "jwt-decode"
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { formatDateTime } from "@utils/formatter"
import useStateRef from "@hooks/useStateRef"

const UserMenu = () => {
  const token = getCookie("token")
  const jwtToken = getCookie("jwt")
  if (jwtToken) {
    const jwtData: IJwtAuthenticateData = jwtDecode(jwtToken.toString())
    return <>
      <div className="tt-desktop-menu">
        <nav>
          <ul>
            <li>
              <div className="tt-user-info d-flex justify-content-center">
                <UserNotification />
                <Link href="/m">
                  <a className="d-flex justify-content-center">
                    <div className="tt-avatar-icon tt-size-md">
                      <i className="tt-icon"><svg><use xlinkHref={"#icon-ava-" + jwtData.name?.trim?.()?.charAt?.(0)?.toLowerCase?.()} /></svg></i>
                    </div>
                    <div className="tt-username d-flex align-items-center ms-2">{jwtData.name}</div>
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div className="tt-account-btn ms-3">
        <form action="/api/v1/auth/logout" method="POST">
          <input type="hidden" name="csrf" className="form-control" value={token?.toString()} />
          <button type="submit" className="btn btn-primary">
            <i className="tt-icon"><svg><use xlinkHref="#logout" /></svg></i>
          </button>
        </form>
      </div>
    </>
  }
  else {

    return <div className="tt-account-btn">
      <Link href={`/login?cb=${encodeURIComponent(window.location.pathname)}`}>
        <a className="btn btn-primary">Đăng nhập</a>
      </Link>
      <Link href={`/signup?cb=${encodeURIComponent(window.location.pathname)}`}>
        <a className="btn btn-secondary">Đăng kí</a>
      </Link>
    </div>
  }
}

const UserNotification = () => {
  const ref = useRef();
  const [wsUrl, setWsUrl] = useState(null)
  const [wsToken, setWsToken] = useState(null)
  const [isPanelOpen, togglePanel] = useState(false)
  const [messages, updateMessages, messageRef] = useStateRef<any[]>([])
  useOnOutsideClick(ref, () => togglePanel(false))

  useEffect(() => {
    fetch("/api/v1/extension/ws")
      .then(async res => {
        if (res.status === 200) {
          let json = await res.json()
          if (json?.data?.pubsub_token) {
            setWsUrl(json?.data?.url)
            setWsToken(json?.data?.pubsub_token)
          }

          if (json?.data?.topic?.messages) {
            updateMessages(json?.data?.topic?.messages || [])
          }
        }
        else {
          throw Error("ErrorStatus" + res.status)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    if (!(wsToken && wsUrl)) {
      return null
    }

    console.log("Connecting to ws");
    // @ts-ignore
    window.WebSocket = window.WebSocket || window.MozWebSocket

    if (window.WebSocket) {
      // open connection
      var connection = new WebSocket(wsUrl);

      connection.onopen = function () {
        // just in there were connection opened...
      };

      connection.onerror = function (error) {
        // just in there were some problems with connection...
      };

      // most important part - incoming messages
      connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
          var json = JSON.parse(message.data);
        } catch (e) {
          console.log('This doesn\'t look like a valid JSON: ', message.data);
          return;
        }

        if (json.type === 'welcome') {
          // subscribe to chatwoot ws
          connection.send(JSON.stringify({
            command: "subscribe",
            identifier: JSON.stringify({
              channel: "RoomChannel",
              pubsub_token: wsToken,
            })
          }));

          setInterval(() => {
            // to notify user that this contact still alive
            connection.send(JSON.stringify({
              command: "message",
              data: "{\"action\":\"update_presence\"}",
              identifier: "{\"channel\":\"RoomChannel\",\"pubsub_token\":\"" + wsToken + "\"}"
            }))
          }, 30000)
        }
        else if (json.message?.event === 'message.created') {
          // new message
          updateMessages(messageRef.current.concat([
            json.message?.data
          ]))
        } else {
          // ignore other messages
        }
      };
    }
  }, [wsToken, wsUrl])

  return <>
    <div className="tt-item-action" ref={ref}>
      <span className="tt-btn-icon pe-2" onClick={() => togglePanel(!isPanelOpen)}>
        <i className="tt-icon">
          <svg style={{ width: 28, fontStyle: "normal" }}>
            <text x="5" y="15">{messages.length}</text>
          </svg>
          <svg><use xlinkHref="#icon-notification" /></svg>
        </i>
      </span>
      {isPanelOpen && <div className="tt-item-action-alert tt-item-notification">
        <div className="tt-topic-list tt-notification-list">
          {messages.length === 0 ? <div className="tt-item">
            <div className="tt-col-description">
              <div className="tt-title">
                {"Bạn không có thông báo nào hết"}
              </div>
            </div>
          </div> :
            [].concat(messages).reverse().map(mes => <NotificationItem data={mes} key={mes.id} />)}
        </div>
      </div>}
    </div>
  </>
}

const NotificationItem = React.memo(({ data }: { data: any }) => {
  let content = data.content,
    actionHref = "#"
  try {
    const json = JSON.parse(content)
    content = json.content
    actionHref = json.href
  }
  catch (err) { }
  return <div className="tt-item">
    <div className="tt-col-description">
      <div className="tt-title">
        <a className="p-0" href={actionHref}>
          {content}
        </a>
      </div>
      <div className="no-gutters">
        <small><i>{formatDateTime(data.created_at)}</i></small>
      </div>
    </div>
  </div>
})

export default UserMenu