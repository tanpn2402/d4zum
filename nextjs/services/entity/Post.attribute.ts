import BaseAttribute from "./Base.attribute"

interface PostAttribute<ICategory, IUser, ITag, IReaction, IComment> extends BaseAttribute {
  title: string
  description: string
  slug: string
  content: string,
  categories?: ICategory,
  user?: IUser,
  tags?: ITag,
  is_locked?: boolean
  is_blocked?: boolean
  is_trending?: boolean
  is_pinned?: boolean
  reactions?: IReaction
  comments?: IComment
  is_private?: boolean
  allow_comment_by_picture?: boolean
}

export default PostAttribute