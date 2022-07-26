import UserAttribute from "@services/entity/User.attribute";
import IBase from "./IBase";
import IPhoto from "./IPhoto";

interface IUser extends IBase, UserAttribute<IPhoto> { }

export default IUser