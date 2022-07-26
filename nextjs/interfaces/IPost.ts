import PostAttribute from "@services/entity/Post.attribute";
import IBase from "./IBase";
import ICategory from "./ICategory";
import IComment from "./IComment";
import IReaction from "./IReaction";
import ITag from "./ITag";
import IUser from "./IUser";

interface IPost extends IBase, PostAttribute<ICategory[], IUser, ITag[], IReaction[], IComment[]> {
  reactionCount?: number,
  commentCount?: number
}

export default IPost