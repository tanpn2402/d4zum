import BaseEntity from "./Base.entity";
import PostEntity from "./Post.entity";
import ReactionAttribute from "./Reaction.attribute";
import RelationResponse from "./RelationResponse.entity";
import UserEntity from "./User.entity";

export default interface ReactionEntity extends BaseEntity<
  ReactionAttribute<
    RelationResponse<UserEntity>,
    RelationResponse<PostEntity>
  >
> { }