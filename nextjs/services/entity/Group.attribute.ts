import BaseAttribute from "./Base.attribute"

interface GroupAttribute<IPost, IUser> extends BaseAttribute {
  description: string
  name: string
  slug?: string
  posts?: IPost
  users?: IUser
}

export default GroupAttribute