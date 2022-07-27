import IPhoto from "./IPhoto"

interface IJwtAuthenticateData {
  id: string
  username: string
  name: string
  email: string
  picture?: IPhoto
}

export default IJwtAuthenticateData