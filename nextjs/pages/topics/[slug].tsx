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

const PageSingleTopic: NextPage<Props> = ({
  tags,
  posts,
  category
}: Props) => {

  return <>
    <Head>
      <title>let d4zum = new DevForum(Chủ đề: {category.name})</title>
      <meta name="description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />

      <meta property="og:url" content="https://d4zum.me" />
      <meta property="og:title" content={`let d4zum = new DevForum(Chủ đề: ${category.name})`} />
      <meta property="og:description" content={category.description} />
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
                <li><span className="tt-color01 tt-badge" style={{ backgroundColor: category.color }}>{category.name}</span></li>
              </ul>
            </div>
            <div className="ml-left tt-col-right">
              <div className="tt-col-item">
                <h2 className="tt-value">bài viết: {posts.length}</h2>
              </div>
              {/* <div className="tt-col-item">
                <a href="#" className="tt-btn-icon">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
                </a>
              </div>
              <div className="tt-col-item">
                <div className="tt-search">
                  <button className="tt-search-toggle" data-toggle="modal" data-target="#modalAdvancedSearch">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-search" />
                    </svg>
                  </button>
                  <form className="search-wrapper">
                    <div className="search-form">
                      <input type="text" className="tt-search__input" placeholder="Search in politics" />
                      <button className="tt-search__btn" type="submit">
                        <svg className="tt-icon">
                          <use xlinkHref="#icon-search" />
                        </svg>
                      </button>
                      <button className="tt-search__close">
                        <svg className="tt-icon">
                          <use xlinkHref="#icon-cancel" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
          <div className="tt-innerwrapper">
            {category.description}
          </div>
          <div className="tt-innerwrapper">
            <h6 className="tt-title">Các TAGS</h6>
            <ul className="tt-list-badge">
              {tags?.map?.(tag => <li>
                <Link href={"/tag/" + tag.name?.toLowerCase()}>
                  <a><span className="tt-badge">{tag.name}</span></a>
                </Link>
              </li>)}
            </ul>
          </div>
        </div>
        <TopicList posts={posts} />
      </div>
    </main>
    <SvgSprite />
  </>
}

type Props = {
  category: ICategory
  tags: ITag[],
  posts: IPost[]
}

interface IQueryParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.query as IQueryParams;
  const [categories] = await Promise.all([
    getCategories({
      slug
    })
  ])

  if (categories.length === 0) {
    return {
      redirect: {
        destination: '/404?cb=' + context.req.url,
        permanent: false,
      },
    }
  }

  const [posts, tags] = await Promise.all([
    getPosts({
      categoryId: categories[0].id
    }),
    getTags({
      categoryId: categories[0].id
    })
  ])

  return {
    props: {
      category: categories[0],
      posts,
      tags: tags?.reduce?.((result: ITag[], tag: ITag) => {
        if (tag.name.trim() !== "" && result.filter(el => el.name.trim() === tag.name.trim()).length === 0) {
          result.push(tag)
        }
        return result
      }, [])
    }
  };
}

export default PageSingleTopic