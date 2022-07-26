import BaseAttribute from "./Base.attribute"

interface CategoryAttribute extends BaseAttribute {
  description: string
  name: string
  slug: string
  color: string
}

export default CategoryAttribute