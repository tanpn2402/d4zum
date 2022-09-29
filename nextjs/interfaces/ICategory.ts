import CategoryAttribute from "@services/entity/Category.attribute";
import IBase from "./IBase";
import IPost from "./IPost";

interface ICategory extends IBase, CategoryAttribute<IPost[]> { }

export default ICategory