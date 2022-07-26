import BaseAttribute from "./Base.attribute";

export default interface CommmentAttribute<IUser, IPost> extends BaseAttribute {
  content: string
  user: IUser
  post?: IPost
}