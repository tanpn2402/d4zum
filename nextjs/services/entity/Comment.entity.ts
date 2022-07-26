import BaseEntity from "./Base.entity";
import CommmentAttribute from "./Comment.attribute";
import PostEntity from "./Post.entity";
import RelationResponse from "./RelationResponse.entity";
import UserEntity from "./User.entity";

export default interface CommentEntity extends BaseEntity<
  CommmentAttribute<
    RelationResponse<UserEntity>,
    RelationResponse<PostEntity>
  >
> { }