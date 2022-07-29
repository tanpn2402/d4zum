import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SuggestedTopic from "@components/SuggestedTopic"
import SvgSprite from "@components/SvgSprite"
import IComment from "@interfaces/IComment"
import IPost from "@interfaces/IPost"
import IReaction from "@interfaces/IReaction"
import { get as getPosts, getMeta as getPostMeta } from "@services/graphql/api/Post.api"
import { formatDateTime } from "@utils/formatter"
import { getCookies } from "cookies-next"
import ReactionType from "enums/ReactionType"
import { GetServerSideProps, NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"

const LoginReminder = dynamic(() => import("@components/LoginReminder"), {
  ssr: false
})

const CommentEditor = dynamic(() => import("@components/CommentEditor"), {
  ssr: false
})

const Topic: NextPage = ({
  post,
  reactions,
  comments: initalComments
}: Props) => {
  const [comments, updateComments] = useState<IComment[]>(initalComments)

  useEffect(() => {
    ((function (hljs) {
      if (hljs) {
        hljs.highlightAll()
      }
    }))(
      // @ts-ignore
      hljs
    )
  }, [comments])

  const handleRefreshComment = async () => {
    let resp = await getPostMeta({ slug: post.slug })
    if (resp?.comments) {
      updateComments(resp?.comments)
    }
  }

  return <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={`Dev Forum bài viết: ${post.title}`} />
      <link rel="stylesheet" href="/css/simplemde.min.css" />

      <meta property="og:url" content={`https://d4zum.me/p/${post.slug}`} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={`Dev Forum bài viết: ${post.title}`} />
      {/* <meta property="og:image" content={post} /> */}
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent">
      <div className="container">
        <div className="tt-single-topic-list">
          <div className="tt-item">
            <div className="tt-single-topic">
              <div className="tt-item-header">
                <div className="tt-item-info info-top">
                  <div className="tt-avatar-icon">
                    <i className="tt-icon"><svg><use xlinkHref={"#icon-ava-" + post.user?.name?.charAt?.(0)?.toLowerCase?.()} /></svg></i>
                  </div>
                  <div className="tt-avatar-title">
                    <a href="#">{post.user?.name}</a>
                  </div>
                  <a href="#" className="tt-info-time">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-time" /></svg></i>{formatDateTime(post.createdAt)}
                  </a>
                </div>
                <h3 className="tt-item-title">
                  {post.title}
                </h3>
                <div className="tt-item-tag">
                  <ul className="tt-list-badge">
                    {post.categories[0]?.name && <li>
                      <Link href={"/category/" + post.categories[0]?.slug}>
                        <a><span className="tt-color03 tt-badge">{post.categories[0]?.name}</span></a>
                      </Link>
                    </li>}

                    {post.tags?.map(tag => tag.name?.trim?.() === "" ? null : <li key={tag.id}>
                      <Link href={"/tag/" + tag.name?.toLowerCase()}>
                        <a><span className="tt-badge">{tag.name}</span></a>
                      </Link>
                    </li>)}
                  </ul>
                </div>
              </div>
              <div className="tt-item-description" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              <div className="tt-item-info info-bottom">
                <a href="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-like" /></svg></i>
                  <span className="tt-text">{reactions.filter(el => el.type === ReactionType.LIKE).length}</span>
                </a>
                <a href="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-dislike" /></svg></i>
                  <span className="tt-text">{reactions.filter(el => el.type === ReactionType.DISLIKE).length}</span>
                </a>
                <a href="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
                  <span className="tt-text">{reactions.filter(el => el.type === ReactionType.LOVE).length}</span>
                </a>
                <div className="col-separator" />
                {/* <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-share" /></svg></i>
                </a>
                <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-flag" /></svg></i>
                </a>
                <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-reply" /></svg></i>
                </a> */}
              </div>
            </div>
          </div>
          <div className="tt-item">
            <div className="tt-info-box">
              {/* <h6 className="tt-title">Thread Status</h6>
              <div className="tt-row-icon">
                <div className="tt-item">
                  <a href="#" className="tt-icon-btn tt-position-bottom">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-reply" /></svg></i>
                    <span className="tt-text">283</span>
                  </a>
                </div>
                <div className="tt-item">
                  <a href="#" className="tt-icon-btn tt-position-bottom">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-view" /></svg></i>
                    <span className="tt-text">10.5k</span>
                  </a>
                </div>
                <div className="tt-item">
                  <a href="#" className="tt-icon-btn tt-position-bottom">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-user" /></svg></i>
                    <span className="tt-text">168</span>
                  </a>
                </div>
                <div className="tt-item">
                  <a href="#" className="tt-icon-btn tt-position-bottom">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-like" /></svg></i>
                    <span className="tt-text">2.4k</span>
                  </a>
                </div>
                <div className="tt-item">
                  <a href="#" className="tt-icon-btn tt-position-bottom">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
                    <span className="tt-text">951</span>
                  </a>
                </div>
                <div className="tt-item">
                  <a href="#" className="tt-icon-btn tt-position-bottom">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-share" /></svg></i>
                    <span className="tt-text">32</span>
                  </a>
                </div>
              </div>
              <hr /> */}
              {comments.length === 0 && <>
                <h6 className="tt-title">Chưa có bình luận</h6>
              </>}

              {comments.length > 0 && <>
                <h6 className="tt-title">Những người dùng nhiệt tình đã bình luận</h6>
                <div className="tt-row-icon">
                  <div className="tt-item">
                    <a href="#" className=" tt-icon-avatar">
                      <svg><use xlinkHref="#icon-ava-d" /></svg>
                    </a>
                  </div>
                  <div className="tt-item">
                    <a href="#" className=" tt-icon-avatar">
                      <svg><use xlinkHref="#icon-ava-t" /></svg>
                    </a>
                  </div>
                  <div className="tt-item">
                    <a href="#" className=" tt-icon-avatar">
                      <svg><use xlinkHref="#icon-ava-k" /></svg>
                    </a>
                  </div>
                  <div className="tt-item">
                    <a href="#" className=" tt-icon-avatar">
                      <svg><use xlinkHref="#icon-ava-n" /></svg>
                    </a>
                  </div>
                  <div className="tt-item">
                    <a href="#" className=" tt-icon-avatar">
                      <svg><use xlinkHref="#icon-ava-a" /></svg>
                    </a>
                  </div>
                  <div className="tt-item">
                    <a href="#" className=" tt-icon-avatar">
                      <svg><use xlinkHref="#icon-ava-c" /></svg>
                    </a>
                  </div>
                  <div className="tt-item">
                    <a href="#" className=" tt-icon-avatar">
                      <svg><use xlinkHref="#icon-ava-h" /></svg>
                    </a>
                  </div>
                </div>
              </>}

              {/* <hr />
              <div className="row-object-inline form-default">
                <h6 className="tt-title">Sort replies by:</h6>
                <ul className="tt-list-badge tt-size-lg">
                  <li><a href="#"><span className="tt-badge">Recent</span></a></li>
                  <li><a href="#"><span className="tt-color02 tt-badge">Most Liked</span></a></li>
                  <li><a href="#"><span className="tt-badge">Longest</span></a></li>
                  <li><a href="#"><span className="tt-badge">Shortest</span></a></li>
                  <li><a href="#"><span className="tt-badge">Accepted Answers</span></a></li>
                </ul>
                <select className="tt-select form-control">
                  <option value="Recent">Recent</option>
                  <option value="Most Liked">Most Liked</option>
                  <option value="Longest">Longest</option>
                  <option value="Shortest">Shortest</option>
                  <option value="Accepted Answer">Accepted Answer</option>
                </select>
              </div> */}
            </div>
          </div>
          {comments?.map?.(el => {
            return <div key={el.id} className="tt-item">
              <div className="tt-single-topic">
                <div className="tt-item-header pt-noborder">
                  <div className="tt-item-info info-top">
                    <div className="tt-avatar-icon">
                      <i className="tt-icon"><svg><use xlinkHref={"#icon-ava-" + el.user?.name?.charAt?.(0)?.toLowerCase?.()} /></svg></i>
                    </div>
                    <div className="tt-avatar-title">
                      <a href="#">{el.user?.name}</a>
                    </div>
                    <a href="#" className="tt-info-time">
                      <i className="tt-icon"><svg><use xlinkHref="#icon-time" /></svg></i>{formatDateTime(el.createdAt)}
                    </a>
                  </div>
                </div>
                <div className="tt-item-description tt-item-description-comment" dangerouslySetInnerHTML={{ __html: el.content }}></div>
                <div className="tt-item-info info-bottom">
                  {/* <a href="#" className="tt-icon-btn">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-like" /></svg></i>
                    <span className="tt-text">{reactions.filter(el => el.type === ReactionType.LIKE).length}</span>
                  </a>
                  <a href="#" className="tt-icon-btn">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-dislike" /></svg></i>
                    <span className="tt-text">{reactions.filter(el => el.type === ReactionType.DISLIKE).length}</span>
                  </a>
                  <a href="#" className="tt-icon-btn">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
                    <span className="tt-text">{reactions.filter(el => el.type === ReactionType.LOVE).length}</span>
                  </a> */}
                  {/* <div className="col-separator" />
                  <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-share" /></svg></i>
                  </a>
                  <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-flag" /></svg></i>
                  </a>
                  <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-reply" /></svg></i>
                  </a> */}
                </div>
              </div>
            </div>
          })}
        </div>
        {comments.length > 10 && <div className="tt-wrapper-inner">
          <h4 className="tt-title-separator"><span>Bạn đã đến tận cùng của danh sách bình luận</span></h4>
        </div>}
        <br />
        <div className="tt-topic-list">
          <LoginReminder />
        </div>
        <CommentEditor post={post} onCreateCommentCB={() => handleRefreshComment()} />
        <SuggestedTopic />
      </div>
    </main>

    <SvgSprite />
  </>
}

interface Props {
  post: IPost,
  comments?: IComment[],
  reactions?: IReaction[],
}

interface IQueryParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.query as IQueryParams;
  const [posts, meta] = await Promise.all([
    getPosts({ slug }),
    getPostMeta({ slug })
  ])

  if (!posts[0]) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  let cookies = getCookies({
    req: context.req,
    res: context.res,
  })

  if (posts[0].is_private) {
    if ((!cookies["jwt"] || !cookies["secret"])) {
      return {
        redirect: {
          destination: '/private-post',
          permanent: false,
        },
      }
    }
  }
  return {
    props: {
      post: posts[0],
      comments: meta?.comments || [],
      reactions: meta?.reactions || []
    }
  };
}

export default Topic