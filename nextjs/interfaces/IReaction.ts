import ReactionAttribute from "@services/entity/Reaction.attribute";
import IBase from "./IBase";
import IPost from "./IPost";
import IUser from "./IUser";

interface IReaction extends IBase, ReactionAttribute<IUser, IPost> { }

export default IReaction