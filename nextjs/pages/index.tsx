import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SvgSprite from "@components/SvgSprite"
import TopicList from "@components/TopicList"
import IPost from "@interfaces/IPost"
import { get as getPosts } from "@services/graphql/api/Post.api"
import type { GetServerSideProps, NextPage } from 'next'
import Head from "next/head"

const Home: NextPage = ({
  posts
}: Props) => {
  return <>
    <Head>
      <title>let d4zum = new DevForum(Trang chủ)</title>
      <meta name="description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />

      <meta property="og:url" content="https://d4zum.me" />
      <meta property="og:title" content="let d4zum = new DevForum(Trang chủ)" />
      <meta property="og:description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />
      {/* <meta property="og:image" content="https://d4zum.me/main-banner.jpg" /> */}
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent" className="tt-offset-small">
      <div className="container">
        <TopicList posts={posts} />
      </div>
    </main>

    <SvgSprite />
  </>
}

interface Props {
  posts: IPost[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const posts = await getPosts({})
  return {
    props: {
      posts
    }
  };
}

export default Home
