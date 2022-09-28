import IUser from "@interfaces/IUser";
import { LoggerManager } from "@utils/logger";
import { EWSError, EWSNotiType } from "./enum";
import { IPubSubToken, ITopic, IWebsocket, IWSNotification, IWSUser } from "./interfaces"

const LOGGER = LoggerManager.getLogger(__filename)

enum EMessageContentType {
  ARTICLE = "article",
  CARDS = "cards"
}

function fetchHelper(endpoint: string, method: string, body?: any) {
  return new Promise((resolve: (arg0: Response) => any, reject: (arg0: any) => any) => {
    let options: { method: string, headers: any, body?: any } = {
      "method": method,
      "headers": {
        "Content-Type": "application/json",
        "api_access_token": process.env.WS_CHATWOOT_API_ACCESS_TOKEN
      }
    }

    if (method !== "GET") {
      options.body = JSON.stringify(body)
    }
    else {
      delete options.body
    }

    LOGGER.info(`Fetching [${method}] ${process.env.WS_CHATWOOT_URL}/${endpoint}`, options)

    fetch(`${process.env.WS_CHATWOOT_URL}/${endpoint}`, options)
      .then(response => {
        if (response.status === 200) {
          LOGGER.info(`Fetched with statusCode = ${response.status}`)
          resolve(response)
        }
        else {
          throw Error([
            "ErrorStatus",
            response.status.toString()
          ].join(""))
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}


class ChatwootWS implements IWebsocket {

  // to get source_id
  getUserToken(email: string): Promise<IWSUser> {
    return new Promise(resolve => {
      fetchHelper(`api/v1/accounts/${process.env.WS_CHATWOOT_AGENT_ID}/contacts/search?q=` + encodeURIComponent(email), "GET")
        .then(async response => {
          const json = await response.json()
          // LOGGER.info("getUserToken", json)
          if (json?.payload?.length > 0) {
            const source_id = json.payload[0].contact_inboxes?.filter?.((el: any) => el?.inbox?.inbox_identifier === process.env.WS_CHATWOOT_CHANNEL_TOKEN)[0]?.source_id
            resolve({
              source_id: source_id,
              email: json?.payload[0].email,
              name: json?.payload[0].name,
              id: json?.payload[0].id
            })
          }
          else {
            throw Error(EWSError.NO_CONTACT.toString())
          }
        })
        .catch(err => {
          resolve({
            source_id: null,
            error: err.message
          })
        });
    })
  }

  sendNotification(message: IWSNotification): Promise<IWSNotification> {
    return new Promise(resolve => {
      // get source_id
      this.getUserToken(message.targetUser.email)
        .then(({ error, source_id, ...userToken }) => {
          if (!error && source_id) {

            // get conversation_id
            const pubsub: IPubSubToken = {
              url: null,
              pubsub_token: null,
              source_id,
              ...userToken
            }
            this.getTopic(pubsub, message.type)
              .then(({ error, id }) => {
                if (!error && id) {

                  let wsNotiMessage: {
                    content: string,
                    message_type: string,
                    content_type?: EMessageContentType,
                    content_attributes?: any
                  } = {
                    content: message.content,
                    message_type: "incoming"
                  }

                  if (message.type === EWSNotiType.NOTIFICATION) {

                  }
                  else if (message.type === EWSNotiType.POST) {
                    wsNotiMessage.content_type = EMessageContentType.ARTICLE
                    wsNotiMessage.content_attributes = {
                      "items": [
                        {}
                      ]
                    }
                  }

                  // send message
                  fetchHelper(`api/v1/accounts/${process.env.WS_CHATWOOT_AGENT_ID}/conversations/${id}/messages`, "POST", wsNotiMessage)
                    .then(async response => {
                      const json = await response.json()
                      // LOGGER.info("sendNotification", json)

                      resolve({
                        ...message,
                        id: json.id,
                        content: json.content,
                        topic_id: id
                      })
                    })
                    .catch(err => {
                      // @ts-ignore ignore-missing-not-optional-properties
                      resolve({
                        error: err.message
                      })
                    });
                }
                else {
                  // @ts-ignore ignore-missing-not-optional-properties
                  resolve({
                    error: error
                  })
                }
              })
          }
          else {
            // @ts-ignore ignore-missing-not-optional-properties
            resolve({
              error: error
            })
          }
        })
    })
  }

  // to get pubsub_token
  getPubsubToken(user: IUser): Promise<IPubSubToken> {
    return new Promise(resolve => {
      this.getUserToken(user.email)
        .then(response => {
          let url: string, method: string
          if (!response.error && response.source_id) {
            // get pubsub_token
            url = `public/api/v1/inboxes/${process.env.WS_CHATWOOT_CHANNEL_TOKEN}/contacts/${response.source_id}`
            method = "GET"
          }
          else {
            // create contact
            url = `public/api/v1/inboxes/${process.env.WS_CHATWOOT_CHANNEL_TOKEN}/contacts`
            method = "POST"
          }

          fetchHelper(url, method, method === "GET" ? null : {
            email: user.email,
            name: user.username,
            phone_number: user.phoneNumber
          })
            .then(async response => {
              const json = await response.json()
              // LOGGER.info("getPubsubToken", json)
              resolve({
                url: process.env.WS_CHATWOOT_WSURL,
                source_id: json.source_id,
                pubsub_token: json.pubsub_token,
                id: json.id,
                name: json.name,
                email: json.email,
                phone_number: json.phone_number
              })
            })
            .catch(err => {
              resolve({
                url: null,
                source_id: null,
                pubsub_token: null,
                error: err.message
              })
            });
        })
    })
  }

  // create conversation
  join(pubsub: IPubSubToken): Promise<ITopic> {
    return new Promise(resolve => {
      fetchHelper(`api/v1/accounts/${process.env.WS_CHATWOOT_AGENT_ID}/conversations`, 'POST', {
        "inbox_id": process.env.WS_CHATWOOT_CHANNEL_ID,
        "source_id": pubsub.source_id,
        "contact_id": pubsub.id,
        "custom_attributes": {
          "type": "notification",
          "email": pubsub.email
        }
      })
        .then(async response => {
          const json = await response.json()
          // LOGGER.info("join", json)

          let topic: ITopic = {
            id: json.id
          }

          this.getMessage(topic)
            .then(({ error, messages }) => {
              if (!error) {
                topic.messages = messages
                resolve(topic)
              }
              else {
                resolve(topic)
              }
            })
        })
        .catch(err => {
          resolve({
            id: null,
            error: err.message
          })
        });
    })
  }

  getMessage(topic: ITopic): Promise<ITopic> {
    return new Promise(resolve => {
      fetchHelper(`api/v1/accounts/${process.env.WS_CHATWOOT_AGENT_ID}/conversations/${topic.id}/messages`, 'GET')
        .then(async response => {
          const json = await response.json()
          // LOGGER.info("getMessage", json)
          resolve({
            id: topic.id,
            messages: json.payload || []
          })
        })
        .catch(err => {
          resolve({
            id: null,
            error: err.message
          })
        });
    })
  }

  // to get conversation_id and messages
  getTopic(pubsub: IPubSubToken, wsNotiType: EWSNotiType): Promise<ITopic> {
    /*
    * new enhance
    return new Promise(resolve => {
      fetchHelper(`api/v1/accounts/${process.env.WS_CHATWOOT_AGENT_ID}/conversations/filter`, 'POST', {
        "payload": [
          {
            "attribute_key": "type",
            "filter_operator": "equal_to",
            "values": [
              wsNotiType.toString()
            ],
            "query_operator": "AND"
          },
          {
            "attribute_key": "email",
            "filter_operator": "equal_to",
            "values": [
              pubsub.email
            ]
          }
        ]
      })
        .then(async response => {
          const json = await response.json()
          // LOGGER.info("getTopic", json)
          if (json?.payload?.length > 0) {
            let topic: ITopic = {
              id: json?.payload[0].id,
            }

            this.getMessage(topic)
              .then(({ error, messages }) => {
                if (!error) {
                  topic.messages = messages
                  resolve(topic)
                }
                else {
                  resolve(topic)
                }
              })
          }
          else {
            throw Error(EWSError.NO_TOPIC.toString())
          }
        })
        .catch(err => {
          resolve({
            id: null,
            error: err.message
          })
        });
    })
    *
    */

    return new Promise(resolve => {
      fetchHelper(`public/api/v1/inboxes/${process.env.WS_CHATWOOT_CHANNEL_TOKEN}/contacts/${pubsub.source_id}/conversations`, 'GET')
        .then(response => response.json())
        .then(json => {
          if (json && json.length) {
            resolve({
              id: json[0].id,
              messages: json[0].messages
            })
          }
          else {
            throw Error(EWSError.NO_TOPIC.toString())
          }
        })
        .catch(err => {
          resolve({
            id: null,
            error: err.message
          })
        });
    })
  }
}

export default ChatwootWS