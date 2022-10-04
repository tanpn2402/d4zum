import CommentBlock from "@components/Comment/comment-block"
import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SuggestedTopic from "@components/SuggestedTopic"
import SvgSprite from "@components/SvgSprite"
import useStateRef from "@hooks/useStateRef"
import IComment from "@interfaces/IComment"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IPost from "@interfaces/IPost"
import IReaction from "@interfaces/IReaction"
import { EWSNotiType } from "@lib/ws/enum"
import { get as getPosts, getMeta as getPostMeta } from "@services/graphql/api/Post.api"
import { formatDateTime } from "@utils/formatter"
import { isInternalIpAddress } from "@utils/helper"
import { getCookies } from "cookies-next"
import PublicationState from "enums/PublicationState"
import ReactionType from "enums/ReactionType"
import WsEvent from "enums/WsEvent"
import jwtDecode from "jwt-decode"
import { GetServerSideProps, NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"

const LoginReminder = dynamic(() => import("@components/LoginReminder"), {
  ssr: false
})

const CommentEditor = dynamic(() => import("@components/Comment/comment-editor"), {
  ssr: false
})

const Topic: NextPage = ({
  post,
  jwtData,
  isPostOwner,
  comments: initialComments,
  reactions: initialReactions,
  myReaction: initialMyReaction,
}: Props) => {
  const router = useRouter()
  const [wsConnection, updateWsConnection, wsConnectionRef] = useStateRef<WebSocket>(null)
  const [comments, updateComments] = useState<IComment[]>(initialComments)
  const [reactions, updateReactions] = useState<IReaction[]>(initialReactions)
  const [myReaction, updateMyReaction] = useState<IReaction>(initialMyReaction)

  useEffect(() => {
    return () => {
      if (wsConnectionRef.current) {
        wsConnectionRef.current.close()
        updateWsConnection(null)
      }
    }
  }, [])

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

  useEffect(() => {
    fetch(`/api/v1/extension/ws?url=${encodeURIComponent(window.location.pathname)}&type=${EWSNotiType.POST.toString()}`)
      .then(async res => {
        if (res.status === 200) {
          let json = await res.json()
          if (json?.data?.length) {
            let wsNotification = json?.data.filter(e => e.type === EWSNotiType.POST)[0]
            if (wsNotification) {
              // @ts-ignore
              window.WebSocket = window.WebSocket || window.MozWebSocket

              if (window.WebSocket) {
                // open connection
                if (wsConnectionRef.current) {
                  wsConnectionRef.current.close()
                  updateWsConnection(null)
                }
                var connection = new WebSocket(wsNotification?.url + `?type=${EWSNotiType.POST.toString()}`)

                connection.onmessage = function (message) {
                  try {
                    var json = JSON.parse(message.data);
                  } catch (e) {
                    console.log('This doesn\'t look like a valid JSON: ', message.data);
                    return;
                  }

                  if (json.type === 'welcome') {
                    // subscribe to chatwoot ws
                    connection.send(JSON.stringify({
                      command: "subscribe",
                      identifier: JSON.stringify({
                        channel: "RoomChannel",
                        pubsub_token: wsNotification?.pubsub_token,
                      })
                    }));
                  }
                  else if (json.message?.event === 'message.created') {
                    // receive new message
                    if (json.message.data?.content_type === "article") {
                      try {
                        const content = JSON.parse(json.message.data?.content)
                        if (content.event === WsEvent.POST_REACTION_CREATED.toString() ||
                          content.event === WsEvent.POST_REACTION_CHANGED.toString() ||
                          content.event === WsEvent.POST_REACTION_DELETED.toString()) {
                          handleUpdateReactionCount()
                        }
                        else if (content.event === WsEvent.COMMENT_CREATED.toString() ||
                          content.event === WsEvent.COMMENT_DELETED.toString() ||
                          content.event === WsEvent.COMMENT_UPDATED.toString()) {
                          handleRefreshComment()
                        }
                      }
                      catch (e) {
                        console.log('This doesn\'t look like a valid JSON: ', json.message.data?.content);
                        return;
                      }
                    }
                  }
                  else {
                    // ignore other messages
                  }
                }

                updateWsConnection(connection)
              }
            }
          }
        }
        else {
          throw Error("ErrorStatus" + res.status)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [router.pathname])

  const handleRefreshComment = async () => {
    fetch("/api/v1/post/comment?postId=" + post.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async resp => {
        let json: {
          error: any
          data: IComment[]
        } = await resp.json();
        if (resp.status === 200) {
          updateComments(json.data)
        }
        else {
          throw json.error
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleReaction = async (event: any, type: ReactionType) => {
    event.preventDefault()
    if (jwtData === null) {
      router.push("/login?error=PleaseRelogin")
    }
    else {
      fetch("/api/v1/post/reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId: post.id,
          type: type
        })
      })
        .then(async resp => {
          let json: {
            error: any
            data: IReaction[]
          } = await resp.json();
          if (resp.status === 200) {
            // handleUpdateReactionCount()
          }
          else {
            throw json.error
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleUpdateReactionCount = async () => {
    fetch("/api/v1/post/reaction?postId=" + post.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async resp => {
        let json: {
          error: any
          data: IReaction[]
        } = await resp.json();
        if (resp.status === 200) {
          updateReactions(json.data)
          updateMyReaction(json.data?.filter(reaction => reaction.user?.id === jwtData?.id)[0])
        }
        else {
          throw json.error
        }
      })
      .catch(error => {
        console.log(error)
      })
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
                  <div className="d-flex align-items-center mb-2">
                    <div className="tt-avatar-icon">
                      <Link href={`/m/${post.user?.username}`}>
                        <a>
                          <i className="tt-icon"><svg><use xlinkHref={"#icon-ava-" + post.user?.name?.charAt?.(0)?.toLowerCase?.()} /></svg></i>
                        </a>
                      </Link>
                    </div>
                    <div className="tt-avatar-title">
                      <Link href={`/m/${post.user?.username}`}>
                        <a>{post.user?.name}</a>
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex mb-2">
                    <span className="tt-info-time">
                      <i className="tt-icon"><svg><use xlinkHref="#icon-time" /></svg></i>{formatDateTime(post.createdAt)}
                    </span>
                    {isPostOwner && <Link href={`/edit-post?slug=${post?.slug}`}>
                      <a className="ms-2">Sửa bài viết</a>
                    </Link>}
                  </div>
                </div>
                <h3 className="tt-item-title">
                  {post.title}
                </h3>
                <div className="tt-item-tag">
                  <ul className="tt-list-badge">
                    {post.categories[0]?.name && <li>
                      <Link href={"/topics/" + post.categories[0]?.slug}>
                        <a><span className="tt-color03 tt-badge">{post.categories[0]?.name}</span></a>
                      </Link>
                    </li>}

                    {post.tags?.map(tag => tag.name?.trim?.() === "" ? null : <li key={tag.id}>
                      <Link href={"/tags/" + encodeURIComponent(tag.name?.toLowerCase())}>
                        <a><span className="tt-badge">{tag.name}</span></a>
                      </Link>
                    </li>)}
                  </ul>
                </div>
              </div>
              <div className="tt-item-description" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              <div className="tt-item-info info-bottom">
                <a href="#" className={"tt-icon-btn " + (myReaction?.type === ReactionType.LIKE ? "active" : "")}
                  onClick={ev => handleReaction(ev, ReactionType.LIKE)}>
                  <i className="tt-icon"><svg><use xlinkHref="#icon-like" /></svg></i>
                  <span className="tt-text">+{reactions.filter(el => el.type === ReactionType.LIKE).length}</span>
                  <span className="tt-text ms-2">hữu ích</span>
                </a>
                <a href="#" className={"tt-icon-btn " + (myReaction?.type === ReactionType.DISLIKE ? "active" : "")}
                  onClick={ev => handleReaction(ev, ReactionType.DISLIKE)}>
                  <i className="tt-icon"><svg><use xlinkHref="#icon-dislike" /></svg></i>
                  <span className="tt-text">+{reactions.filter(el => el.type === ReactionType.DISLIKE).length}</span>
                  <span className="tt-text ms-2">an ủi</span>
                </a>
                <a href="#" className={"tt-icon-btn " + (myReaction?.type === ReactionType.LOVE ? "active" : "")}
                  onClick={ev => handleReaction(ev, ReactionType.LOVE)}>
                  <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
                  <span className="tt-text">+{reactions.filter(el => el.type === ReactionType.LOVE).length}</span>
                  <span className="tt-text ms-2">tim</span>
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
            return <CommentBlock key={el.id + "_" + el.updatedAt} {...el} />
          })}
        </div>

        {/* post was published */}
        {post?.publishedAt !== null && <>
          {comments.length > 10 && <div className="tt-wrapper-inner">
            <h4 className="tt-title-separator"><span>Bạn đã đến tận cùng của danh sách bình luận</span></h4>
          </div>}
          <br />
          <div className="tt-topic-list">
            <LoginReminder />
          </div>
          <CommentEditor post={post} onCreateCommentCB={() => handleRefreshComment()} />
          <SuggestedTopic />
        </>}
      </div>
    </main>

    <SvgSprite />
  </>
}

interface Props {
  post: IPost,
  comments?: IComment[],
  reactions?: IReaction[],
  myReaction?: IReaction,
  isPostOwner?: boolean,
  jwtData?: IJwtAuthenticateData
}

interface IQueryParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.query as IQueryParams;
  let cookies = getCookies({ req: context.req, res: context.res })
  let jwtData: IJwtAuthenticateData = null, groupIds = [] as string[]
  if (isInternalIpAddress(context.req.headers["host"])) {
    groupIds = process.env.INTERNAL_GROUP_IDS?.split?.(",") || []
  }
  if (cookies["jwt"]) {
    jwtData = jwtDecode(cookies["jwt"]?.toString?.())
    groupIds = groupIds.concat(jwtData?.groups?.map?.(group => group.id) || [])
  }
  const [posts, meta] = await Promise.all([
    getPosts({ slug, state: PublicationState.PREVIEW, groupIds }),
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

  let myReaction: IReaction = null
  let isPostOwner = jwtData && jwtData.id === posts[0]?.user?.id
  if (posts[0].publishedAt === null && !isPostOwner) {
    return {
      redirect: {
        destination: '/private-post',
        permanent: false,
      },
    }
  }
  if (jwtData?.id) {
    myReaction = meta?.reactions?.filter?.(reaction => reaction.user?.id === jwtData.id)[0] ?? null
  }


  return {
    props: {
      jwtData,
      myReaction,
      isPostOwner,
      post: posts[0],
      comments: meta?.comments || [],
      reactions: meta?.reactions || []
    }
  };
}

export default Topic