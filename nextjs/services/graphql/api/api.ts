
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
  console.log(
    GRAPHQL_URL,
    `Token = ` + bearer
  );
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

  const json: GrapQLResponse<T> = await res.json()
  if (json.errors) {
    console.error(json.errors)
    console.error(query);
    // throw new Error('Failed to fetch API')
  }

  return json
}