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
        pagination: {
          limit: -1
        }
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
    el = el.trim()
    if (!result.includes(el)) {
      result.push(el)
    }
    return result
  }, [])
  if (names.length === 0) {
    return [] as ITag[]
  }

  let resp = await graphQL<{
    [key: string]: {
      data: TagEntity
    }
  }>(
    `mutation {
      ${names.map((el, index) => `tag${index}: createTag(data: {
        name: "${el}"
      }) {
        data {
          id
        }
      }`)}
    }`, {}, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  console.log(resp);
  if (!resp.errors) {
    return Object.keys(resp.data).map((_, index) => {
      let tag = resp.data[`tag${index}`]
      return UtilParser<ITag, TagEntity>(tag.data)
    })
  }
  else {
    return null
  }
}