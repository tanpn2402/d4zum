import ReactionType from "enums/ReactionType";
import BaseAttribute from "./Base.attribute";

export default interface ReactionAttribute<IUser, IPost> extends BaseAttribute {
  type: ReactionType
  user: IUser
  post?: IPost
}