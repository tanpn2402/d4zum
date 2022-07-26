import TagAttribute from "@services/entity/Tag.attribute";
import IBase from "./IBase";
import IPost from "./IPost";

interface ITag extends IBase, TagAttribute<IPost[]> { }

export default ITag