import BaseEntity from "./Base.entity"
import CategoryAttribute from "./Category.attribute"

interface CategoryEntity extends BaseEntity<
  CategoryAttribute
> { }

export default CategoryEntity