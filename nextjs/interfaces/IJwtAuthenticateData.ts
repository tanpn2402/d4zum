import IGroup from "./IGroup"
import IPhoto from "./IPhoto"

interface IJwtAuthenticateData {
  id: string
  username: string
  name: string
  email: string
  picture?: IPhoto
  groups?: IGroup[]
}

export default IJwtAuthenticateData