import IComment from "@interfaces/IComment";
import CommentEntity from "@services/entity/Comment.entity";
import graphQL from "./api";
import UtilParser from "./UtilParser";

export function parseComment(comment: CommentEntity): IComment {
  return UtilParser<IComment, CommentEntity>(comment)
}

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
        data {
          id
          attributes {
            is_blocked
            content
          }
        }
      }
    }`, {
    variables: {
      userId: userId,
      content: content,
      is_blocked: is_blocked,
      postId: postId
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (resp.data?.comment?.data) {
    return parseComment(resp.data.comment.data)
  }
  else {
    return null
  }
}