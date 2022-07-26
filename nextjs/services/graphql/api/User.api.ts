import IPhoto from "@interfaces/IPhoto";
import IUser from "@interfaces/IUser";
import UploadFileEntity from "@services/entity/UploadFile.entity";
import UserEntity from "@services/entity/User.entity";
import UtilParser from "./UtilParser";

export function parseUser(user: UserEntity): IUser {
  return UtilParser<IUser, UserEntity>(user, {
    picture: user => UtilParser<IPhoto, UploadFileEntity>(user.attributes.picture?.data)
  })
}