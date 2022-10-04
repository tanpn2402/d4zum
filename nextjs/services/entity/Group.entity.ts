import BaseEntity from "./Base.entity"
import GroupAttribute from "./Group.attribute"
import PostEntity from "./Post.entity"
import RelationResponse from "./RelationResponse.entity"
import UserEntity from "./User.entity"

interface GroupEntity extends BaseEntity<
  GroupAttribute<
    RelationResponse<PostEntity[]>,
    RelationResponse<UserEntity[]>
  >
> { }

export default GroupEntity