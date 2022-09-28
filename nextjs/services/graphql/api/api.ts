import { LoggerManager } from "@utils/logger"

const LOGGER = LoggerManager.getLogger(__filename)

interface Error {
  message: string
  extensions: {
    [key: string]: any
  }
}

interface GrapQLResponse<T> {
  errors: Error[]
  data: T
}

export default async function graphQL<T>(query: string, { variables }: any = {}, token?: string): Promise<GrapQLResponse<T>> {
  let GRAPHQL_URL = '';
  if (process.env.GRAPHQL_HTTP !== undefined) {
    GRAPHQL_URL = `${process.env.GRAPHQL_HTTP}://${process.env.GRAPHQL_HOST}:${process.env.GRAPHQL_PORT}`;
  }
  const bearer = token || process.env.GRAPHQL_BEARER_TOKEN || process.env.NEXT_PUBLIC_GRAPHQL_BEARER_TOKEN
  // LOGGER.info(
  //   GRAPHQL_URL,
  //   `Token = ` + bearer
  // );
  const res = await fetch(GRAPHQL_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  LOGGER.info("GRAPHQL has been returned data!")

  const json: GrapQLResponse<T> = await res.json()
  if (json.errors) {
    LOGGER.error("GRAPHQL error", json.errors, query)
  }

  return json
}