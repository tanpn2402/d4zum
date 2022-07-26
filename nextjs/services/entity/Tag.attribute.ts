import BaseAttribute from "./Base.attribute"

interface TagAttribute<IPost> extends BaseAttribute {
  name: string
  posts?: IPost
}

export default TagAttribute