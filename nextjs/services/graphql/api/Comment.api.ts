import IComment from "@interfaces/IComment";
import IPost from "@interfaces/IPost";
import CommentEntity from "@services/entity/Comment.entity";
import graphQL from "./api";
import { parseUser } from "./User.api";
import UtilParser from "./UtilParser";

export function parseComment(comment: CommentEntity): IComment {
  return UtilParser<IComment, CommentEntity>(comment, {
    user: reaction => parseUser(reaction.attributes.user.data),
    post: reaction => ({
      id: reaction.attributes.post?.data?.id,
      title: reaction.attributes.post?.data?.attributes?.title,
      slug: reaction.attributes.post?.data?.attributes?.slug,
      user: parseUser(reaction.attributes.post?.data?.attributes?.user?.data)
    }) as IPost
  })
}

const COMMENT_DATA = `data {
  id
  attributes {
    is_blocked
    content
    createdAt
    updatedAt
    user {
      data {
        id
        attributes {
          username
          name
          email
        }
      }
    }
    post {
      data {
        id
        attributes {
          title
          slug
          user {
            data {
              id
              attributes {
                username
                name
                email
              }
            }
          }
        }
      }
    }
  }
}`

interface CommentInputProps {
  userId: string
  content: string
  postId: string
  is_blocked?: boolean
}

export async function create({
  userId, content, postId, is_blocked
}: CommentInputProps): Promise<IComment | null> {
  let resp = await graphQL<{
    comment: {
      data: CommentEntity
    }
  }>(
    `mutation createComment($userId: ID, $content: String, $is_blocked: Boolean, $postId: ID) {
      comment: createComment(data: {
        user: $userId,
        content: $content,
        is_blocked: $is_blocked,
        post: $postId
      }) {
        ${COMMENT_DATA}
      }
    }`, {
    variables: {
      userId: userId,
      content: content,
      is_blocked: is_blocked,
      postId: postId
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return parseComment(resp.data?.comment?.data)
  }
  else {
    return null
  }
}

export async function remove(comment: IComment) {
  let resp = await graphQL<{
    comment: {
      data: CommentEntity
    }
  }>(
    `mutation deleteComment($id: ID!) {
      comment: deleteComment(id: $id) {
        ${COMMENT_DATA}
      }
    }`, {
    variables: {
      id: comment.id
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return parseComment(resp.data?.comment?.data)
  }
  else {
    return null
  }
}

export async function update(comment: IComment) {
  let resp = await graphQL<{
    comment: {
      data: CommentEntity
    }
  }>(
    `mutation updateComment($id: ID!, $content: String, $is_blocked: Boolean) {
      comment: updateComment(id: $id, data: {
        content: $content,
        is_blocked: $is_blocked
      }) {
        ${COMMENT_DATA}
      }
    }`, {
    variables: {
      id: comment.id,
      content: comment.content,
      is_block: comment.is_blocked
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return parseComment(resp.data?.comment?.data)
  }
  else {
    return null
  }
}

export async function get(comment?: IComment): Promise<IComment[] | null> {
  let variables: {
    id?: string
    userId?: string
    postId?: string
    is_block?: boolean
  } = {}

  if (comment) {
    if (comment.id) {
      variables.id = comment.id
    }
    if (comment.post) {
      variables.postId = comment.post.id
    }
    if (comment.user) {
      variables.userId = comment.user.id
    }
    if (typeof comment.is_blocked === "boolean") {
      variables.is_block = comment.is_blocked
    }
  }

  let resp = await graphQL<{
    comments: {
      data: CommentEntity[]
    }
  }>(
    `query query($id: ID, $userId: ID, $postId: ID, $is_block: Boolean) {
      comments (
        filters: {
          id: {
            eq: $id
          }
          user: {
            id: {
              eq: $userId
            }
          }
          post: {
            id: {
              eq: $postId
            }
          }
          is_blocked: {
            eq: $is_block
          }
        }
        pagination: {
          limit: -1
        }
      ) {
        ${COMMENT_DATA}
      }
    }`, {
    variables: variables
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return resp.data?.comments?.data?.map?.(comment => parseComment(comment))
  }
  else {
    return null
  }
}