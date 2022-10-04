import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IPost from "@interfaces/IPost"
import IUser from "@interfaces/IUser"
import { get as getPosts } from "@services/graphql/api/Post.api"
import { getByUsername } from "@services/graphql/api/User.api"
import { isInternalIpAddress } from "@utils/helper"
import { getCookies } from "cookies-next"
import PublicationState from "enums/PublicationState"
import jwtDecode from "jwt-decode"
import { GetServerSideProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import PageMe from "."


const PageUser: NextPage<Props> = (props: Props) => {

  return <PageMe
    {...props}
  />
}

interface Props {
  posts: IPost[],
  me?: IUser,
  itsMe?: boolean
}

interface IQueryParams extends ParsedUrlQuery {
  username: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { username } = context.query as IQueryParams;
  const cookies = getCookies({ req: context.req, res: context.res })
  const userData = await getByUsername(username)
  if (!userData || !userData.id) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  let itsMe = false, groupIds = [] as string[]
  if (isInternalIpAddress(context.req.headers["host"])) {
    groupIds = process.env.INTERNAL_GROUP_IDS?.split?.(",") || []
  }
  if (cookies["jwt"]) {
    const jwtData: IJwtAuthenticateData = jwtDecode(cookies["jwt"]?.toString?.())
    itsMe = jwtData.id === userData.id
    groupIds = groupIds.concat(jwtData?.groups?.map?.(group => group.id) || [])
  }

  const posts = await getPosts({
    userId: userData?.id,
    state: PublicationState.LIVE,
    groupIds
  })

  return {
    props: {
      posts,
      me: userData,
      itsMe
    }
  };
}

export default PageUser