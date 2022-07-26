import BaseEntity from "./Base.entity"
import RelationResponse from "./RelationResponse.entity"
import UploadFileEntity from "./UploadFile.entity"
import UserAttribute from "./User.attribute"

interface UserEntity extends BaseEntity<
  UserAttribute<
    RelationResponse<UploadFileEntity>
  >
> { }

export default UserEntity