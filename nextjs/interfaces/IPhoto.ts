import UploadFileAttribute from "@services/entity/UploadFile.attribute"
import IBase from "./IBase"

interface IPhoto extends IBase, UploadFileAttribute { }

export default IPhoto