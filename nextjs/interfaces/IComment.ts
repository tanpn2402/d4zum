import CommmentAttribute from "@services/entity/Comment.attribute";
import IBase from "./IBase";
import IPost from "./IPost";
import IUser from "./IUser";

interface IComment extends IBase, CommmentAttribute<IUser, IPost> { }

export default IComment