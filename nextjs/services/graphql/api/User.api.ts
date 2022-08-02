import IPhoto from "@interfaces/IPhoto";
import IUser from "@interfaces/IUser";
import UploadFileEntity from "@services/entity/UploadFile.entity";
import UserEntity from "@services/entity/User.entity";
import UserPermissionEntity from "@services/entity/UserPermission.entity";
import graphQL from "./api";
import UtilParser from "./UtilParser";

export function parseUser(user: UserEntity): IUser {
  return UtilParser<IUser, UserEntity>(user, {
    picture: user => UtilParser<IPhoto, UploadFileEntity>(user.attributes.picture?.data)
  })
}

interface UserPermissionInputProps {
  username: string
  password: string
  email?: string
  name?: string
}

export async function validatePassword({
  password,
  username
}: UserPermissionInputProps) {
  let resp = await graphQL<{
    user: {
      jwt: string
      data: UserPermissionEntity
    }
  }>(
    `mutation login($identifier: String!, $password: String!) {
      user: login(input: {
        identifier: $identifier
        password: $password
      }) {
        jwt
        data: user {
          id
          username
          email
          confirmed
          blocked
        }
      }
    }`, {
    variables: {
      "identifier": username,
      "password": password
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  return resp
}

export async function create({
  password,
  username,
  email,
  name
}: UserPermissionInputProps): Promise<{ jwt?: string, data: IUser } | null> {
  let resp = await graphQL<{
    user: {
      jwt?: string
      data: UserEntity
    }
  }>(
    `mutation register($input: UsersPermissionsUserInput!) {
      user: createUsersPermissionsUser(data: $input) {
        data {
          id
          attributes {
            username
            name
            email
          }
        }
      }
    }`, {
    variables: {
      "input": {
        "username": username,
        "password": password,
        "email": email,
        "name": name
      }
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (resp.data?.user?.data) {
    let r = await validatePassword({
      "username": username,
      "password": password
    })

    return {
      jwt: r.data?.user?.jwt,
      data: parseUser(resp.data?.user?.data)
    }
  }
  return null
}

export async function getByUsername(username: string): Promise<IUser | null> {
  return getOne({ username })
}

export async function getById(id: string): Promise<IUser | null> {
  return getOne({ id })
}

async function getOne(p: {
  id?: string
  username?: string
}): Promise<IUser | null> {
  let resp = await graphQL<{
    users: {
      data: UserEntity[]
    }
  }>(
    `query getUsers($id: ID, $username: String) {
      users : usersPermissionsUsers(
        filters: {
          id: {
            eq: $id
          }
          username: {
            eq: $username
          }
        }
      ) {
        data {
          id
          attributes {
            username
            email
            name
            picture {
              data {
                id
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
        }
      }
    }
    `, {
    variables: {
      "id": p.id,
      "username": p.username
    }
  })

  if (!resp.errors) {
    return UtilParser<IUser, UserEntity>(resp.data?.users?.data?.[0], {
      picture: user => UtilParser<IPhoto, UploadFileEntity>(user.attributes.picture?.data)
    })
  }
  else {
    return null
  }
}