import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SvgSprite from "@components/SvgSprite"
import IPost from "@interfaces/IPost"
import { get as getPosts } from "@services/graphql/api/Post.api"
import { formatDateTime } from "@utils/formatter"
import type { GetServerSideProps, NextPage } from 'next'
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"

const LoginReminder = dynamic(() => import("@components/LoginReminder"), {
  ssr: false
})

const Home: NextPage = ({
  posts
}: Props) => {
  return <>
    <Head>
      <title>let d4zum = new DevForum(Trang chủ)</title>
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent" className="tt-offset-small">
      <div className="container">
        <div className="tt-topic-list">
          <div className="tt-list-header">
            <div className="tt-col-topic">Bài viết</div>
            <div className="tt-col-category">Danh mục</div>
            <div className="tt-col-value hide-mobile">Tương tác</div>
            <div className="tt-col-value hide-mobile">Bình luận</div>
            {/* <div className="tt-col-value hide-mobile">Views</div> */}
            <div className="tt-col-value">Thời gian</div>
          </div>
          {/* <div className="tt-topic-alert tt-alert-default" role="alert">
            <a href="#" target="_blank">4 new posts</a> are added recently, click here to load them.
          </div> */}

          {posts && posts.map(post => <div key={post.id} className={`tt-item ${post.is_trending ? "tt-itemselect" : ""}`}>
            <div className="tt-col-avatar">
              <svg className="tt-icon">
                <use xlinkHref={"#icon-ava-" + post.user?.name?.charAt?.(0)?.toLowerCase?.()} />
              </svg>
            </div>
            <div className="tt-col-description">
              <h6 className="tt-title">
                <Link href={"/p/" + post.slug} >
                  <a>
                    {post.is_pinned && <svg className="tt-icon">
                      <use xlinkHref="#icon-pinned" />
                    </svg>}
                    {post.is_locked && <svg className="tt-icon">
                      <use xlinkHref="#icon-locked" />
                    </svg>}
                    {post.title}
                  </a>
                </Link>
              </h6>
              <div className="row align-items-center no-gutters">
                <div className="col-11">
                  <ul className="tt-list-badge">
                    {post.tags?.map(tag => <li key={tag.id}>
                      <Link href={"/tag/" + tag.name?.toLowerCase()}>
                        <a><span className="tt-badge">{tag.name}</span></a>
                      </Link>
                    </li>)}
                    {/* <li className="show-mobile"><a href="#"><span className="tt-color03 tt-badge">exchange</span></a></li>
                    <li><a href="#"><span className="tt-badge">themeforest</span></a></li>
                    <li><a href="#"><span className="tt-badge">elements</span></a></li> */}
                  </ul>
                </div>
                <div className="col-1 ms-auto show-mobile">
                  <div className="tt-value">{formatDateTime(post.createdAt)}</div>
                </div>
              </div>
            </div>
            <div className="tt-col-category">
              <Link href={"/category/" + post.categories[0]?.slug}>
                <a><span className="tt-color03 tt-badge">{post.categories[0]?.name}</span></a>
              </Link>
            </div>
            <div className="tt-col-value  hide-mobile">{post.reactionCount}</div>
            <div className="tt-col-value tt-color-select hide-mobile">{post.commentCount}</div>
            {/* <div className="tt-col-value  hide-mobile">12.6k</div> */}
            <div className="tt-col-value hide-mobile">{formatDateTime(post.createdAt)}</div>
          </div>)}

          <LoginReminder />

          <div className="tt-row-btn">
            <button type="button" className="btn-icon js-topiclist-showmore">
              <svg className="tt-icon">
                <use xlinkHref="#icon-load_lore_icon" />
              </svg>
            </button>
          </div>
        </div>
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
