import BaseAttribute from "./Base.attribute"

interface UserAttribute<IPicture> extends BaseAttribute {
  blocked: boolean
  confirmed: boolean
  email: string
  name: string
  picture?: IPicture
  provider: string
  username: string
}

export default UserAttribute