import ICategory from "@interfaces/ICategory";
import IComment from "@interfaces/IComment";
import IPhoto from "@interfaces/IPhoto";
import IPost from "@interfaces/IPost";
import IReaction from "@interfaces/IReaction";
import ITag from "@interfaces/ITag";
import IUser from "@interfaces/IUser";
import BaseEntity from "@services/entity/Base.entity";
import CategoryEntity from "@services/entity/Category.entity";
import CommentEntity from "@services/entity/Comment.entity";
import PostEntity from "@services/entity/Post.entity";
import ReactionEntity from "@services/entity/Reaction.entity";
import TagEntity from "@services/entity/Tag.entity";
import UploadFileAttribute from "@services/entity/UploadFile.attribute";
import UserEntity from "@services/entity/User.entity";
import graphQL from './api';
import { parseUser } from "./User.api";
import UtilParser from './UtilParser';

type GetPostProps = {
  slug?: string
}

export async function get({
  slug
}: GetPostProps): Promise<IPost[]> {
  let resp = await graphQL(queryPostSchema, {
    variables: {
      slug
    }
  })

  let posts: IPost[] = resp?.posts?.data?.map?.((post: PostEntity) => {
    let p = UtilParser<IPost, PostEntity>(post, {
      tags: post => post.attributes.tags?.data?.map?.(tag => UtilParser<ITag, TagEntity>(tag)),
      categories: post => post.attributes.categories?.data?.map?.(category => UtilParser<ICategory, CategoryEntity>(category)),
      user: post => parseUser(post.attributes.user?.data),
      comments: () => [],
      reactions: () => []
    })

    p.commentCount = post.attributes.comments?.data?.length
    p.reactionCount = post.attributes.reactions?.data?.length

    return p
  })

  return posts
}

export async function getMeta({
  slug
}: GetPostProps): Promise<IPost> {
  let resp = await graphQL(queryPostMetaSchema, {
    variables: {
      slug
    }
  })

  let posts: IPost[] = resp?.posts?.data?.map?.((post: PostEntity) => {
    let p = UtilParser<IPost, PostEntity>(post, {
      comments: post => post.attributes.comments?.data?.map?.(comment => UtilParser<IComment, CommentEntity>(comment, {
        user: cmt => parseUser(cmt.attributes.user?.data),
      })),
      reactions: post => post.attributes.reactions?.data?.map?.(reaction => UtilParser<IReaction, ReactionEntity>(reaction, {
        user: cmt => parseUser(cmt.attributes.user?.data),
      })),
    })

    return p
  })

  return posts[0]
}

const queryPostSchema = `query query($slug: String) {
  posts (
    filters: {
      slug: {
        eq: $slug
      }
    }
  ) {
    data {
      id
      attributes {
        title
        description
        content
        slug
        is_blocked
        is_locked
        is_trending
        is_pinned
        createdAt
        updatedAt
        publishedAt
        tags {
          data {
            id
            attributes {
              name
            }
          }
        }
        categories {
          data {
            id
            attributes {
              slug
              name
              color
            }
          }
        }
        user {
          data {
            id
            attributes {
              username
              name
              picture {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        reactions {
          data {
            id
          }
        }
        comments {
          data {
            id
          }
        }
      }
    }
  }
}`

const queryPostMetaSchema = `query query($slug: String) {
  posts (
    filters: {
      slug: {
        eq: $slug
      }
    }
  ) {
    data {
      id
      attributes {
        reactions {
          data {
            id
            attributes {
              type
              createdAt
              updatedAt
              user {
                data {
                  id
                  attributes {
                    username
                    name
                    picture {
                      data {
                        id
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        comments {
          data {
            id
            attributes {
              content
              is_blocked
              createdAt
              updatedAt
              user {
                data {
                  id
                  attributes {
                    username
                    name
                    picture {
                      data {
                        id
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`