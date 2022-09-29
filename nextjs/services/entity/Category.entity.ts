import BaseEntity from "./Base.entity"
import CategoryAttribute from "./Category.attribute"
import PostEntity from "./Post.entity"
import RelationResponse from "./RelationResponse.entity"

interface CategoryEntity extends BaseEntity<
  CategoryAttribute<
  RelationResponse<PostEntity[]>
>
> { }

export default CategoryEntity