import BaseEntity from "./Base.entity"
import UploadFileAttribute from "./UploadFile.attribute"

interface UploadFileEntity extends BaseEntity<
  UploadFileAttribute
> { }

export default UploadFileEntity