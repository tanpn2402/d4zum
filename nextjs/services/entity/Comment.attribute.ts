import BaseAttribute from "./Base.attribute";

export default interface CommmentAttribute<IUser, IPost> extends BaseAttribute {
  content: string
  is_blocked?: boolean
  user: IUser
  post?: IPost
}