import BaseEntity from "./Base.entity"
import CategoryEntity from "./Category.entity"
import CommentEntity from "./Comment.entity"
import GroupEntity from "./Group.entity"
import PostAttribute from "./Post.attribute"
import ReactionEntity from "./Reaction.entity"
import RelationResponse from "./RelationResponse.entity"
import TagEntity from "./Tag.entity"
import UserEntity from "./User.entity"

interface PostEntity extends BaseEntity<
  PostAttribute<
    RelationResponse<CategoryEntity[]>,
    RelationResponse<UserEntity>,
    RelationResponse<TagEntity[]>,
    RelationResponse<ReactionEntity[]>,
    RelationResponse<CommentEntity[]>,
    RelationResponse<GroupEntity[]>
  >
> { }

export default PostEntity