import PostAttribute from "@services/entity/Post.attribute";
import IBase from "./IBase";
import ICategory from "./ICategory";
import IComment from "./IComment";
import IGroup from "./IGroup";
import IReaction from "./IReaction";
import ITag from "./ITag";
import IUser from "./IUser";

interface IPost extends IBase, PostAttribute<ICategory[], IUser, ITag[], IReaction[], IComment[], IGroup[]> {
  reactionCount?: number,
  commentCount?: number
}

export default IPost