import ICategory from "@interfaces/ICategory"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IPost from "@interfaces/IPost"
import ITag from "@interfaces/ITag"
import IUser from "@interfaces/IUser"
import { get as getPosts } from "@services/graphql/api/Post.api"
import { getByUsername } from "@services/graphql/api/User.api"
import { get as getCategories } from "@services/graphql/api/Category.api"
import { get as getTags } from "@services/graphql/api/Tag.api"
import { getCookies } from "cookies-next"
import PublicationState from "enums/PublicationState"
import jwtDecode from "jwt-decode"
import { GetServerSideProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import PageNewPost from "./new-post"


const PageUser: NextPage<Props> = (props: Props) => {

  return <PageNewPost
    {...props}
  />
}

type Props = {
  secret?: string,
  tags?: ITag[],
  categories?: ICategory[]
  post: IPost
}

interface IQueryParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.query as IQueryParams;
  let cookies = getCookies({
    req: context.req,
    res: context.res,
  })

  if (!cookies["jwt"]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const [categories, tags, posts] = await Promise.all([
    getCategories({}),
    getTags({}),
    getPosts({
      slug: slug,
      state: PublicationState.PREVIEW
    })
  ])

  if (!posts?.[0]) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  let jwtData: IJwtAuthenticateData = jwtDecode(cookies["jwt"].toString())
  if (posts[0].user?.id !== jwtData.id) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  return {
    props: {
      tags,
      post: posts[0],
      categories,
      secret: cookies["secret"],
    }
  };
}

export default PageUser