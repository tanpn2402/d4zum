import IPost from "@interfaces/IPost";
import IReaction from "@interfaces/IReaction";
import ReactionEntity from "@services/entity/Reaction.entity";
import graphQL from "./api";
import { parseUser } from "./User.api";
import UtilParser from "./UtilParser";

export function parseReaction(reaction: ReactionEntity): IReaction {
  return UtilParser<IReaction, ReactionEntity>(reaction, {
    user: reaction => parseUser(reaction.attributes.user.data),
    post: reaction => ({
      id: reaction.attributes.post?.data?.id,
      title: reaction.attributes.post?.data?.attributes?.title,
      slug: reaction.attributes.post?.data?.attributes?.slug,
      user: parseUser(reaction.attributes.post?.data?.attributes?.user?.data)
    }) as IPost
  })
}

const REACTION_DATA = `data  {
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

export async function get(reaction: IReaction): Promise<IReaction[]> {
  let variables = {} as {
    userId?: String,
    postId?: String
  }
  if (reaction.user) {
    variables.userId = reaction.user.id
  }
  if (reaction.post) {
    variables.postId = reaction.post.id
  }

  let resp = await graphQL<{
    reactions: {
      data: ReactionEntity[]
    }
  }>(`query query($userId: ID, $postId: ID) {
    reactions (
      filters: {
        user: {
          id: {
            eq: $userId,
            notNull: true
          }
        }
        post: {
          id: {
            eq: $postId,
            notNull: true
          }
        }
      }
      pagination: {
        limit: -1
      }
    ) {
      ${REACTION_DATA}
    }
  }`, {
    variables
  })

  if (!resp.errors) {
    return resp.data?.reactions?.data?.map?.((reaction: ReactionEntity) => parseReaction(reaction))
  }
  else {
    return []
  }
}

export async function create(reaction: IReaction): Promise<IReaction | null> {
  let resp = await graphQL<{
    reaction: {
      data: ReactionEntity
    }
  }>(
    `mutation createReaction($userId: ID, $type: String, $postId: ID) {
      reaction: createReaction(data: {
        user: $userId,
        post: $postId,
        type: $type
      }) {
        ${REACTION_DATA}
      }
    }`, {
    variables: {
      userId: reaction.user.id,
      postId: reaction.post.id,
      type: reaction.type
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return parseReaction(resp.data.reaction.data)
  }
  else {
    return null
  }
}

export async function remove(reaction: IReaction) {
  let resp = await graphQL<{
    reaction: {
      data: ReactionEntity
    }
  }>(
    `mutation deleteReaction($id: ID!) {
      reaction: deleteReaction(id: $id) {
        ${REACTION_DATA}
      }
    }`, {
    variables: {
      id: reaction.id
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return parseReaction(resp.data.reaction.data)
  }
  else {
    return null
  }

}