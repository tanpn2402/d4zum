import BaseEntity from "./Base.entity"
import GroupEntity from "./Group.entity"
import RelationResponse from "./RelationResponse.entity"
import UploadFileEntity from "./UploadFile.entity"
import UserAttribute from "./User.attribute"

interface UserEntity extends BaseEntity<
  UserAttribute<
    RelationResponse<UploadFileEntity>,
    RelationResponse<GroupEntity[]>
  >
> { }

export default UserEntity