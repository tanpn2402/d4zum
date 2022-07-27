export default interface UserPermissionEntity {
  id: string
  username: string
  email: string
  confirmed?: boolean
  blocked?: boolean
}