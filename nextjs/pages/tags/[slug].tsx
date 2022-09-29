import ICategory from "@interfaces/ICategory"
import { get as getCategories } from "@services/graphql/api/Category.api"
import { GetServerSideProps, NextPage } from "next"
import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SvgSprite from "@components/SvgSprite"
import Head from "next/head"
import ITag from "@interfaces/ITag"
import Link from "next/link"
import { ParsedUrlQuery } from "querystring"
import { get as getPosts } from "@services/graphql/api/Post.api"
import { get as getTags } from "@services/graphql/api/Tag.api"
import IPost from "@interfaces/IPost"
import TopicList from "@components/TopicList"

const PageSingleTag: NextPage<Props> = ({
  tag,
  posts,
}: Props) => {

  return <>
    <Head>
      <title>let d4zum = new DevForum(Thẻ tag: {tag.name})</title>
      <meta name="description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />

      <meta property="og:url" content="https://d4zum.me" />
      <meta property="og:title" content={`let d4zum = new DevForum(Chủ đề: ${tag.name})`} />
      <meta property="og:description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />
      {/* <meta property="og:image" content="https://d4zum.me/main-banner.jpg" /> */}
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent">
      <div className="container">
        <div className="tt-catSingle-title">
          <div className="tt-innerwrapper tt-row">
            <div className="tt-col-left">
              <ul className="tt-list-badge">
                <li>Tag <span className="tt-color01 tt-badge">{tag.name}</span></li>
              </ul>
            </div>
            <div className="ml-left tt-col-right">
              <div className="tt-col-item">
                <h2 className="tt-value">bài viết: {posts.length}</h2>
              </div>
            </div>
          </div>
        </div>
        <TopicList posts={posts} />
      </div>
    </main>
    <SvgSprite />
  </>
}

type Props = {
  tag: ITag,
  posts: IPost[]
}

interface IQueryParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug: tagName } = context.query as IQueryParams;

  const [posts] = await Promise.all([
    getPosts({
      tagName: decodeURIComponent(tagName)
    }),
  ])

  return {
    props: {
      posts,
      tag: {
        name: tagName
      } as ITag
    }
  };
}

export default PageSingleTag