import IPost from "@interfaces/IPost"
import { formatDateTime } from "@utils/formatter"
import dynamic from "next/dynamic"
import Link from "next/link"

const LoginReminder = dynamic(() => import("@components/LoginReminder"), {
  ssr: false
})

const TopicList = ({
  posts
}: {
  posts: IPost[]
}) => {

  return <div className="tt-topic-list">
    <div className="tt-list-header">
      <div className="tt-col-topic">Bài viết</div>
      <div className="tt-col-category">Chủ đề</div>
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
        <Link href={"/m/" + post.user?.username}>
          <a>
            <svg className="tt-icon">
              <use xlinkHref={"#icon-ava-" + post.user?.name?.charAt?.(0)?.toLowerCase?.()} />
            </svg>
          </a>
        </Link>
      </div>
      <div className="tt-col-description">
        <h6 className="tt-title">
          <Link href={"/p/" + post.slug} >
            <a>
              {post.is_pinned && <svg className="tt-icon">
                <use xlinkHref="#icon-pinned" />
              </svg>}
              {post.is_private && <svg className="tt-icon">
                <use xlinkHref="#icon-locked" />
              </svg>}
              {post.title}
            </a>
          </Link>
        </h6>
        <div className="row align-items-center no-gutters">
          <div className="col-12">
            <ul className="tt-list-badge">
              {post.tags?.map(tag => tag.name?.trim?.() === "" ? null : <li key={tag.id}>
                <Link href={"/tags/" + encodeURIComponent(tag.name?.toLowerCase())}>
                  <a><span className="tt-badge">{tag.name}</span></a>
                </Link>
              </li>)}
              {/* <li className="show-mobile"><a href="#"><span className="tt-color03 tt-badge">exchange</span></a></li>
            <li><a href="#"><span className="tt-badge">themeforest</span></a></li>
            <li><a href="#"><span className="tt-badge">elements</span></a></li> */}
            </ul>
          </div>
          <div className="col-1 show-mobile">
            <div className="tt-value">{formatDateTime(post.createdAt)}</div>
          </div>
        </div>
      </div>
      {post.categories[0]?.name && <div className="tt-col-category">
        <Link href={"/topics/" + post.categories[0]?.slug}>
          <a><span className="tt-color03 tt-badge" style={{ backgroundColor: post.categories[0]?.color }}>{post.categories[0]?.name}</span></a>
        </Link>
      </div>}
      <div className="tt-col-value  hide-mobile">{post.reactionCount > 9 ? "9+" : post.reactionCount}</div>
      <div className="tt-col-value hide-mobile">{post.commentCount > 9 ? "9+" : post.commentCount}</div>
      {/* <div className="tt-col-value  hide-mobile">12.6k</div> */}
      <div className="tt-col-value hide-mobile">
        <div>{formatDateTime(post.createdAt, { dateFormat: "none" })}</div>
        <small>{formatDateTime(post.createdAt, { timeFormat: "none" })}</small>
      </div>
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
}

export default TopicList