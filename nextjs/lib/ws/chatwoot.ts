import IUser from "@interfaces/IUser";
import { EWSError, IPubSubToken, ITopic, IWebsocket } from "./interfaces"

function fetchHelper(endpoint: string, method: string, body?: any) {
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

  console.log(`Fetching [${method}] ${process.env.WS_CHATWOOT_URL}/${endpoint}`, options);
  return fetch(`${process.env.WS_CHATWOOT_URL}/${endpoint}`, options)
}


class ChatwootWS implements IWebsocket {
  getPubsubToken(user: IUser): Promise<IPubSubToken> {
    return new Promise(resolve => {
      // get contact 
      fetchHelper(`api/v1/accounts/2/contacts/search?q=` + encodeURIComponent(user.email), "GET")
        .then(async response => {
          if (response.status === 200) {
            const json = await response.json()
            console.log("getPubsubToken", json)

            let url: string, method: string
            if (json?.payload?.length > 0) {
              const contactData = json.payload[0].contact_inboxes?.filter?.((el: any) => el?.inbox?.inbox_identifier === process.env.WS_CHATWOOT_CHANNEL_TOKEN)[0]

              if (contactData && contactData.source_id) {
                // get pubsub_token
                url = `public/api/v1/inboxes/${process.env.WS_CHATWOOT_CHANNEL_TOKEN}/contacts/${contactData.source_id}`
                method = "GET"
              }
              else {
                // create contact
                url = `public/api/v1/inboxes/${process.env.WS_CHATWOOT_CHANNEL_TOKEN}/contacts`
                method = "POST"
              }
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
                if (response.status === 200) {
                  const json = await response.json()
                  console.log("getPubsubToken", json)
                  resolve({
                    url: process.env.WS_CHATWOOT_WSURL,
                    source_id: json.source_id,
                    pubsub_token: json.pubsub_token
                  })
                }
                else {
                  throw Error([
                    "ErrorStatus",
                    response.status.toString()
                  ].join(""))
                }
              })
              .catch(err => {
                resolve({
                  url: null,
                  source_id: null,
                  pubsub_token: null,
                  error: err.message
                })
              });
          }
          else {
            throw Error([
              "ErrorStatus",
              response.status.toString()
            ].join(""))
          }
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
  }

  join(source_id: string): Promise<ITopic> {
    return new Promise(resolve => {
      fetchHelper(`public/api/v1/inboxes/${process.env.WS_CHATWOOT_CHANNEL_TOKEN}/contacts/${source_id}/conversations`, 'POST')
        .then(async response => {
          if (response.status === 200) {
            const json = await response.json()
            console.log("join", json)
            resolve({
              id: json.id
            })
          }
          else {
            throw Error([
              "ErrorStatus",
              response.status.toString()
            ].join(""))
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

  getTopic(source_id: string): Promise<ITopic> {
    return new Promise(resolve => {
      fetchHelper(`public/api/v1/inboxes/${process.env.WS_CHATWOOT_CHANNEL_TOKEN}/contacts/${source_id}/conversations`, 'GET')
        .then(async response => {
          if (response.status === 200) {
            const json = await response.json()
            console.log("getTopic", json)
            if (json && json.length) {
              resolve({
                id: json[0].id,
                messages: json[0].messages
              })
            }
            else {
              throw Error(EWSError.NO_TOPIC.toString())
            }
          }
          else {
            return Error([
              "ErrorStatus",
              response.status.toString()
            ].join(""))
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