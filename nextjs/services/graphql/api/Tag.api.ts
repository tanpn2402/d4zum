import graphQL from "./api";
import ITag from "@interfaces/ITag";
import UtilParser from "./UtilParser";
import TagEntity from "@services/entity/Tag.entity";

interface GetProps {
  name?: string
}

export async function get({
  name
}: GetProps): Promise<ITag[] | null> {
  let resp = await graphQL<{
    tags: {
      data: TagEntity[]
    }
  }>(
    `query query($name: String) {
      tags (
        filters: {
          name: {
            eq: $name
          }
        }
        sort: "createdAt:ASC"
      ) {
        data {
          id,
          attributes {
            name
          }
        }
      }
    }`, {
    variables: {
      "name": name
    }
  })

  if (resp.data?.tags?.data) {
    return resp.data?.tags?.data?.map?.(tag => UtilParser<ITag, TagEntity>(tag))
  }
  else {
    return null
  }
}

export async function create({
  names
}: {
  names: string[]
}): Promise<ITag[] | null> {
  names = names.reduce((result: string[], el: string) => {
    if (!result.includes(el)) {
      result.push(el)
    }
    return result
  }, [])
  let resp = await graphQL<{
    [key: string]: {
      data: TagEntity
    }
  }>(
    `mutation {
      ${names.map(el => `tag${el}: createTag(data: {
        name: "${el}"
      }) {
        data {
          id
        }
      }`)}
    }`, {}, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return Object.keys(resp.data).map(el => {
      let tag = resp.data[el]
      return UtilParser<ITag, TagEntity>(tag.data)
    })
  }
  else {
    return null
  }
}