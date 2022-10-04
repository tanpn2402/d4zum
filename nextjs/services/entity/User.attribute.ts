import BaseAttribute from "./Base.attribute"

interface UserAttribute<IPicture, IGroup> extends BaseAttribute {
  blocked: boolean
  confirmed: boolean
  email: string
  name: string
  picture?: IPicture
  provider: string
  username: string
  phoneNumber?: string
  groups?: IGroup
}

export default UserAttribute