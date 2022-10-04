import graphQL from "./api";
import ICategory from "@interfaces/ICategory";
import CategoryEntity from "@services/entity/Category.entity";
import UtilParser from "./UtilParser";
import IPost from "@interfaces/IPost";
import ITag from "@interfaces/ITag";
import TagEntity from "@services/entity/Tag.entity";
import PostEntity from "@services/entity/Post.entity";

export function parseCategory(category: CategoryEntity): ICategory {
  return UtilParser<ICategory, CategoryEntity>(category, {
    posts: category => category.attributes.posts?.data?.map?.(post => UtilParser<IPost, PostEntity>(post, {
      tags: post => post.attributes.tags?.data?.map?.(tag => UtilParser<ITag, TagEntity>(tag))
    }))
  })
}

interface GetProps {
  slug?: string
  postGroupIds?: string[]
}

export async function get({
  slug,
  postGroupIds
}: GetProps): Promise<ICategory[] | null> {
  let variables = {} as GetProps
  if (slug) {
    variables.slug = slug
  }
  if (postGroupIds) {
    variables.postGroupIds = postGroupIds
  }
  let resp = await graphQL<{
    categories: {
      data: CategoryEntity[]
    }
  }>(
    `query query($slug: String, $postGroupIds: [ID]) {
      categories (
        filters: {
          slug: {
            eq: $slug
          }
          posts: {
            or: [
              {
                groups: {
                  id: {
                    eq: null
                  }
                }
              },
              {
                groups: {
                  id: {
                    in: $postGroupIds
                  }
                }
              }
            ]
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
            slug
            description
            color
            posts {
              data {
                id
                attributes {
                  title
                  slug
                  tags {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`, {
    variables: variables
  })

  if (resp.data?.categories?.data) {
    return resp.data?.categories?.data?.map?.(category => parseCategory(category))
  }
  else {
    return null
  }
}