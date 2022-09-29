import graphQL from "./api";
import ITag from "@interfaces/ITag";
import UtilParser from "./UtilParser";
import TagEntity from "@services/entity/Tag.entity";

interface GetProps {
  name?: string | string[]
  categoryId?: string
}

export async function get({
  name,
  categoryId
}: GetProps): Promise<ITag[] | null> {
  let variables = {} as {
    names: string[],
    name: string,
    categoryId?: string
  }
  if (name) {
    if (Array.isArray(name)) {
      variables.names = name
    }
    else {
      variables.name = name
    }
  }
  if (categoryId) {
    variables.categoryId = categoryId
  }
  let resp = await graphQL<{
    tags: {
      data: TagEntity[]
    }
  }>(
    `query query($categoryId: ID, $names: [String], $name: String) {
      tags (
        filters: {
          name: {
            in: $names,
            eq: $name
          }
          posts: {
            categories: {
              id: {
                eq: $categoryId
              }
            }
          }
        }
        pagination: {
          limit: -1
        }
      ) {
        data {
          id
          attributes {
            name
            createdAt
          }
        }
      }
    }`, {
    variables: variables
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