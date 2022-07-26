import BaseEntity from "./Base.entity"
import PostEntity from "./Post.entity"
import RelationResponse from "./RelationResponse.entity"
import TagAttribute from "./Tag.attribute"

interface TagEntity extends BaseEntity<
  TagAttribute<
    RelationResponse<PostEntity[]>
  >
> { }

export default TagEntity