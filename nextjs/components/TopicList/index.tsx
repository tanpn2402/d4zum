import IPost from "@interfaces/IPost"
import { formatDateTime } from "@utils/formatter"
import dynamic from "next/dynamic"
import Link from "next/link"

const LoginReminder = dynamic(() => import("@components/LoginReminder"), {
  ssr: false
})

export enum TopicListColumn {
  TITLE,
  TOPIC,
  REACTION,
  COMMENT,
  VIEW,
  TIME_CREATED,
  STATE,
  SETTING
}

export enum ActionType {
  SETTING_CLICK
}

const TopicList = ({
  posts,
  columns = [
    TopicListColumn.TITLE,
    TopicListColumn.TOPIC,
    TopicListColumn.REACTION,
    TopicListColumn.COMMENT,
    TopicListColumn.TIME_CREATED
  ],
  onActionClick
}: {
  posts: IPost[],
  columns?: TopicListColumn[],
  onActionClick?: (type: ActionType, value?: any) => void
}) => {

  return <div className="tt-topic-list">
    <div className="tt-list-header">
      <div className="tt-col-topic">Bài viết</div>
      <div className="tt-col-category">Chủ đề</div>
      {columns.includes(TopicListColumn.REACTION) && <div className="tt-col-value hide-mobile">Tương tác</div>}
      {columns.includes(TopicListColumn.COMMENT) && <div className="tt-col-value hide-mobile">Bình luận</div>}
      {columns.includes(TopicListColumn.STATE) && <div className="tt-col-value hide-mobile">Trạng thái</div>}
      {columns.includes(TopicListColumn.TIME_CREATED) && <div className="tt-col-value">Thời gian</div>}
    </div>

    {posts && posts.map(post => <div key={post.id} className={`tt-item ${post.is_trending ? "tt-itemselect" : ""}`}>
      <div className="tt-col-avatar">
        {!columns.includes(TopicListColumn.SETTING) && <Link href={"/m/" + post.user?.username}>
          <a>
            <svg className="tt-icon">
              <use xlinkHref={"#icon-ava-" + post.user?.name?.charAt?.(0)?.toLowerCase?.()} />
            </svg>
          </a>
        </Link>}

        {columns.includes(TopicListColumn.SETTING) && <svg className="tt-icon js-post-settings-btn" onClick={() => {
          onActionClick?.(ActionType.SETTING_CLICK, post)
        }}>
          <use xlinkHref="#icon-settings_fill" />
        </svg>}
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
            </ul>
          </div>
          {columns.includes(TopicListColumn.TIME_CREATED) && <div className="col-1 show-mobile">
            <div className="tt-value">{formatDateTime(post.createdAt)}</div>
          </div>}
        </div>
      </div>
      {
        post.categories[0]?.name && <div className="tt-col-category">
          <Link href={"/topics/" + post.categories[0]?.slug}>
            <a><span className="tt-color03 tt-badge" style={{ backgroundColor: post.categories[0]?.color }}>{post.categories[0]?.name}</span></a>
          </Link>
        </div>
      }
      {columns.includes(TopicListColumn.REACTION) && <div className="tt-col-value  hide-mobile">{post.reactionCount > 9 ? "9+" : post.reactionCount}</div>}
      {columns.includes(TopicListColumn.COMMENT) && <div className="tt-col-value hide-mobile">{post.commentCount > 9 ? "9+" : post.commentCount}</div>}
      {columns.includes(TopicListColumn.STATE) && <div className="tt-col-value">{post.publishedAt === null ? "PREVIEW" : "LIVE"}</div>}
      {
        columns.includes(TopicListColumn.TIME_CREATED) && <div className="tt-col-value hide-mobile">
          <div>{formatDateTime(post.createdAt, { dateFormat: "none" })}</div>
          <small>{formatDateTime(post.createdAt, { timeFormat: "none" })}</small>
        </div>
      }
    </div>)
    }

    <LoginReminder />

    <div className="tt-row-btn">
      <button type="button" className="btn-icon js-topiclist-showmore">
        <svg className="tt-icon">
          <use xlinkHref="#icon-load_lore_icon" />
        </svg>
      </button>
    </div>
  </div >
}

export default TopicList