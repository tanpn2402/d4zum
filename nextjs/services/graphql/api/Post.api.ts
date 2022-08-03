import ICategory from "@interfaces/ICategory";
import IComment from "@interfaces/IComment";
import IPost from "@interfaces/IPost";
import IReaction from "@interfaces/IReaction";
import ITag from "@interfaces/ITag";
import CategoryEntity from "@services/entity/Category.entity";
import CommentEntity from "@services/entity/Comment.entity";
import PostEntity from "@services/entity/Post.entity";
import ReactionEntity from "@services/entity/Reaction.entity";
import TagEntity from "@services/entity/Tag.entity";
import { generateSlug } from "@utils/helper";
import PublicationState from "enums/PublicationState";
import graphQL from './api';
import { parseUser } from "./User.api";
import UtilParser from './UtilParser';

type GetPostProps = {
  slug?: string
  userId?: string
  state?: PublicationState
}

type PostGraphQLResponse = {
  posts: {
    data: PostEntity[]
  }
}

export async function get({
  slug,
  userId,
  state
}: GetPostProps): Promise<IPost[]> {
  let resp = await graphQL<PostGraphQLResponse>(queryPostSchema, {
    variables: {
      slug,
      userId,
      state
    }
  })

  let posts: IPost[] = resp.data?.posts?.data?.map?.((post: PostEntity) => {
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
}: GetPostProps): Promise<IPost | null> {
  let resp = await graphQL<{
    comments: {
      data: CommentEntity[]
    },
    reactions: {
      data: ReactionEntity[]
    },
    posts: {
      data: PostEntity[]
    }
  }>(queryPostMetaSchema, {
    variables: {
      slug
    }
  })

  if (!resp.errors && resp.data?.posts?.data?.[0]) {
    const comments = resp.data?.comments?.data?.map?.(comment => UtilParser<IComment, CommentEntity>(comment, {
      user: cmt => parseUser(cmt.attributes.user?.data),
    }))
    const reactions = resp.data?.reactions?.data?.map?.(reaction => UtilParser<IReaction, ReactionEntity>(reaction, {
      user: cmt => parseUser(cmt.attributes.user?.data),
    }))

    let post = UtilParser<IPost, PostEntity>(resp.data?.posts?.data?.[0], {
      comments: () => null,
      reactions: () => null,
      user: () => null
    })

    post.comments = comments
    post.reactions = reactions

    return post
  }
  else {
    return null
  }
}

export async function create({
  content,
  title,
  userId,
  categories,
  tags,
  asDraft
}: {
  userId: string
  title: string
  content: string
  categories?: string[]
  tags?: string[]
  asDraft?: boolean
}): Promise<IPost> {
  let resp = await graphQL<{
    post: {
      data: PostEntity
    }
  }>(
    `mutation createPost($userId: ID, $content: String, $title: String, $slug: String, $categories: [ID], $tags: [ID], $publishedAt: DateTime) {
      post: createPost(data: {
        user: $userId,
        title: $title,
        content: $content,
        categories: $categories,
        tags: $tags,
        slug: $slug,
        is_blocked: false,
        is_locked: false,
        is_pinned: false,
        is_trending: false,
        publishedAt: $publishedAt
      }) {
        data {
          id
          attributes {
            slug
            title
            createdAt
            publishedAt
          }
        }
      }
    }`, {
    variables: {
      "userId": userId,
      "content": content,
      "title": title,
      "categories": categories,
      "tags": tags,
      "slug": generateSlug(title, {}),
      "publishedAt": asDraft ? null : new Date().toISOString()
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return UtilParser<IPost, PostEntity>(resp.data.post?.data)
  }
  else {
    return null
  }
}

export async function update({
  id,
  content,
  title,
  userId,
  categories,
  tags,
  slug,
  publishedAt
}: {
  id: string
  userId: string
  title: string
  content: string
  categories?: string[]
  tags?: string[],
  slug?: string,
  publishedAt?: string

}): Promise<IPost> {
  let resp = await graphQL<{
    post: {
      data: PostEntity
    }
  }>(
    `mutation updatePost($id: ID!, $userId: ID, $content: String, $title: String, $categories: [ID], $tags: [ID], $slug: String, $publishedAt: DateTime) {
      post: updatePost(id: $id, data: {
        user: $userId,
        title: $title,
        content: $content,
        categories: $categories,
        tags: $tags,
        publishedAt: $publishedAt
        slug: $slug
      }) {
        data {
          id
          attributes {
            slug
            title
            publishedAt
          }
        }
      }
    }`, {
    variables: {
      "id": id,
      "userId": userId,
      "content": content,
      "title": title,
      "categories": categories,
      "tags": tags,
      "slug": slug,
      "publishedAt": publishedAt,
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return UtilParser<IPost, PostEntity>(resp.data.post?.data)
  }
  else {
    return null
  }
}

export async function publish({
  slug
}: {
  id?: string
  slug: string
}): Promise<IPost | null> {

  let posts = await get({ slug, state: PublicationState.PREVIEW })
  if (posts[0]) {
    let resp = await update({
      id: posts[0].id,
      content: posts[0].content,
      title: posts[0].title,
      userId: posts[0].user?.id,
      slug: posts[0].publishedAt === null ? generateSlug(posts[0].title, {}) : posts[0].slug,
      publishedAt: posts[0].publishedAt === null ? new Date().toISOString() : null
    })

    return resp
  }
  else {
    return null
  }
}

const queryPostSchema = `query query($slug: String, $userId: ID, $state: PublicationState) {
  posts (
    filters: {
      slug: {
        eq: $slug
      }
      user: {
        id: {
          eq: $userId
        }
      }
    }
    pagination: {
      limit: -1
    }
    sort: "is_pinned:DESC,createdAt:ASC"
    publicationState: $state
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
        is_private
        allow_comment_by_picture
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
  comments (
    filters: {
      post: {
        slug: {
          eq: $slug
        }
      }
    }
    sort: "createdAt:ASC"
    pagination: {
      limit: -1
    }
  ) {
    data {
      id
      attributes {
        content
        createdAt
        updatedAt
        is_blocked
        user {
          ...userFragment
        }
      }
    }
  }
  reactions (
    filters: {
      post: {
        slug: {
          eq: $slug
        }
      }
    }
    sort: "createdAt:ASC"
    pagination: {
      limit: -1
    }
  ) {
    data {
      id
      attributes {
        type
        createdAt
        updatedAt
        user {
          ...userFragment
        }
      }
    }
  }
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
        slug
      }
    }
  }
}

fragment userFragment on UsersPermissionsUserEntityResponse {
  data {
    id
    attributes {
      username
      name
      email
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
}`