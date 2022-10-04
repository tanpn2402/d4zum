import UserAttribute from "@services/entity/User.attribute";
import IBase from "./IBase";
import IGroup from "./IGroup";
import IPhoto from "./IPhoto";

interface IUser extends IBase, UserAttribute<IPhoto, IGroup[]> { }

export default IUser