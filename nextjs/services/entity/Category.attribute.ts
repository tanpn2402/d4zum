import BaseAttribute from "./Base.attribute"

interface CategoryAttribute<IPost> extends BaseAttribute {
  description: string
  name: string
  slug: string
  color: string
  posts?: IPost
}

export default CategoryAttribute