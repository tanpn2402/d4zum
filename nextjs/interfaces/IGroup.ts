import GroupAttribute from "@services/entity/Group.attribute";
import IBase from "./IBase";
import IPost from "./IPost";
import IUser from "./IUser";

interface IGroup extends IBase, GroupAttribute<IPost[], IUser[]> { }

export default IGroup