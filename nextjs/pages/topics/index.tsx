import ICategory from "@interfaces/ICategory"
import { get as getCategories } from "@services/graphql/api/Category.api"
import { GetServerSideProps, NextPage } from "next"
import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SvgSprite from "@components/SvgSprite"
import Head from "next/head"
import ITag from "@interfaces/ITag"
import Link from "next/link"

const PageTopic: NextPage<Props> = ({
  categories
}: Props) => {

  return <>
    <Head>
      <title>let d4zum = new DevForum(Trang chủ đề)</title>
      <meta name="description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />

      <meta property="og:url" content="https://d4zum.me" />
      <meta property="og:title" content="let d4zum = new DevForum(Trang chủ đề" />
      <meta property="og:description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />
      {/* <meta property="og:image" content="https://d4zum.me/main-banner.jpg" /> */}
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent">
      <div className="tt-custom-mobile-indent container">
        <div className="tt-categories-title">
          <div className="tt-title">Chủ đề</div>
          {/* <div className="tt-search">
            <form className="search-wrapper">
              <div className="search-form">
                <input type="text" className="tt-search__input" placeholder="Search Categories" />
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
          </div> */}
        </div>
        <div className="tt-categories-list">
          <div className="row">
            {categories?.map?.(category => {
              return <div key={category.id} className="col-md-6 col-lg-4">
                <div className="tt-item">
                  <div className="tt-item-header">
                    <ul className="tt-list-badge">
                      <li>
                        <Link href={"/topics/" + category.slug}>
                          <a><span className="tt-color01 tt-badge" style={{ backgroundColor: category.color }}>{category.name}</span></a>
                        </Link>
                      </li>
                    </ul>
                    <h6 className="tt-title">
                      <Link href={"/topics/" + category.slug}>
                        <a>bài viết: {category.posts?.length > 9 ? "9+" : category.posts?.length}</a>
                      </Link>
                    </h6>
                  </div>
                  <div className="tt-item-layout">
                    <div className="innerwrapper" style={{ minHeight: 60 }}>
                      {category.description}
                    </div>
                    <div className="innerwrapper">
                      <h6 className="tt-title">Các TAGS</h6>
                      <ul className="tt-list-badge">
                        {category.posts?.reduce?.((result: ITag[], el) => {
                          if (result.length < 5) {
                            el.tags?.forEach?.(tag => {
                              if (tag.name.trim() !== "" && result.filter(ell => ell.name.trim() === tag.name.trim()).length === 0) {
                                result.push(tag)
                              }
                            })
                          }
                          return result
                        }, [])?.map?.(tag => <li key={tag.id}>
                          <Link href={"/tags/" + encodeURIComponent(tag.name?.toLowerCase())}>
                            <a><span className="tt-badge">{tag.name}</span></a>
                          </Link>
                        </li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </main>
    <SvgSprite />
  </>
}

type Props = {
  categories?: ICategory[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const [categories] = await Promise.all([
    getCategories({})
  ])

  return {
    props: {
      categories
    }
  };
}

export default PageTopic