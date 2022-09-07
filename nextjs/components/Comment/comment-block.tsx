import IComment from "@interfaces/IComment"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import { formatDateTime } from "@utils/formatter"
import { getCookies } from "cookies-next"
import jwtDecode from "jwt-decode"
import Link from "next/link"
import { useEffect, useState } from "react"
import initEditor from "@components/Editor/init"


const CommentBlock = ({
  id,
  content: initContent,
  user,
  createdAt,
  post
}: IComment) => {

  const [contentHtmlId, setContentHtmlId] = useState(new Date().getTime())
  const [updateRespError, setUpdateRespError] = useState(null)
  const [cmtEditor, setCmtEditor] = useState<any>(null)
  const [content, setContent] = useState(initContent)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  let jwtData: IJwtAuthenticateData
  let cookies = getCookies()
  if (cookies["jwt"]) {
    jwtData = jwtDecode(cookies["jwt"]?.toString?.())
  }
  else {
    jwtData = {} as IJwtAuthenticateData;
  }

  const handleEdit = (ev: any) => {
    ev.preventDefault()
    setIsDelete(false)
    if (isEdit) {
      setContentHtmlId(new Date().getTime())
    }
    setIsEdit(!isEdit)
  }

  const handleDelete = (ev: any) => {
    ev.preventDefault()
    setIsEdit(false)
    setIsDelete(!isDelete)
    setUpdateRespError(null)
  }

  const handleCancelDelete = (ev: any) => {
    ev.preventDefault()
    setIsDelete(!isDelete)
  }

  const handleSendDelete = (ev: any) => {
    ev.preventDefault()
    setUpdateRespError(null)
    fetch('/api/comments/' + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + cookies["secret"]?.toString?.()
      }
    })
      .then(async resp => {
        if (resp.status === 200) {
          setIsDeleted(true)
        }
        else {
          setUpdateRespError("Lỗi rồi hãy thử lại nhé!")
        }
      })
  }

  const handleUpdate = (ev: any) => {
    ev.preventDefault()
    setUpdateRespError(null)
    const reqBody = {
      "data": {
        "user": user?.id,
        "content": cmtEditor.getData(),
        "is_blocked": false,
        "post": id
      }
    }

    fetch('/api/comments/' + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + cookies["secret"]?.toString?.()
      },
      body: JSON.stringify(reqBody)
    })
      .then(async resp => {
        if (resp.status === 200) {
          let json = await resp.json()
          setContent(json?.data?.attributes?.content)
          setIsEdit(!isEdit)
        }
        else {
          setUpdateRespError("Lỗi rồi hãy thử lại nhé!")
        }
      })
  }

  useEffect(() => {
    if (isEdit) {
      (function (ClassicEditor) {
        if (ClassicEditor && !cmtEditor) {
          const cmtSelector = `.tt-comment-editor-${id}`;
          initEditor(ClassicEditor, {
            secret: cookies["secret"]?.toString?.(),
            element: document.querySelector(cmtSelector),
            toolbar: [
              'link',
              'code',
              'codeBlock',
              'highlight',
              post?.allow_comment_by_picture && 'imageInsert',
              '|',
              'undo',
              'redo'
            ].filter(e => typeof e === "string")
          })
            .then((editor: any) => {
              setCmtEditor(editor);
            })
            .catch((error: any) => {
              console.error('Oops, something went wrong!');
              console.error(error);
            });
        }
      })(
        // @ts-ignore
        ClassicEditor
      )
    }
    else {
      if (cmtEditor) {
        cmtEditor.destroy();
        setCmtEditor(null);
      }

      ((function (hljs) {
        if (hljs) {
          console.log(hljs);
          hljs.highlightAll()
        }
      }))(
        // @ts-ignore
        hljs
      )
    }
  }, [isEdit, content])

  if (isDeleted) {
    return null
  }

  return <div key={id} className="tt-item">
    <div className="tt-single-topic">
      <div className="tt-item-header pt-noborder">
        <div className="tt-item-info info-top">
          <div className="d-flex align-items-center mb-2">
            <div className="tt-avatar-icon">
              <Link href={`/m/${user?.username}`}>
                <a>
                  <i className="tt-icon"><svg><use xlinkHref={"#icon-ava-" + user?.name?.charAt?.(0)?.toLowerCase?.()} /></svg></i>
                </a>
              </Link>
            </div>
            <div className="tt-avatar-title">
              <Link href={`/m/${user?.username}`}>
                <a>{user?.name}</a>
              </Link>
            </div>
          </div>
          <div className="d-flex">
            <span className="tt-info-time">
              <i className="tt-icon"><svg><use xlinkHref="#icon-time" /></svg></i>{formatDateTime(createdAt)}
            </span>
            {!isEdit && <>
              {jwtData.id === user?.id && <a href="#" className="ms-2" onClick={ev => handleEdit(ev)}>Sửa</a>}
              {jwtData.id === user?.id && <div className="tt-item-action">
                <a href="#" className="ms-2" onClick={ev => handleDelete(ev)}>Xóa</a>
                {isDelete && <div className="tt-item-action-alert">
                  <div>
                    Bạn chắc chứ?
                    <a href="#" className="ms-2" onClick={ev => handleCancelDelete(ev)}>Không</a>
                    <a href="#" className="ms-2" onClick={ev => handleSendDelete(ev)}>Chắc</a>
                  </div>
                  {updateRespError && <span className="text-danger me-4">{updateRespError}</span>}
                </div>}
              </div>}
              {/* {jwtData.id && <a href="#" className="ms-2">Báo xấu</a>} */}
            </>}
          </div>
        </div>
      </div>
      <div key={contentHtmlId} className={`tt-item-description tt-item-description-comment tt-comment-editor-${id}`} dangerouslySetInnerHTML={{ __html: content }}></div>

      {isEdit && <div className="mt-2 d-flex justify-content-end align-items-center">
        {updateRespError && <span className="text-danger me-4">{updateRespError}</span>}
        <button className="btn btn-primary btn-width-lg me-2" onClick={ev => handleEdit(ev)}>Hủy</button>
        <button className="btn btn-secondary btn-width-lg" onClick={ev => handleUpdate(ev)}>Cập nhật</button>
      </div>}

      <div className="tt-item-info info-bottom">

        {/* <a href="#" className="tt-icon-btn">
        <i className="tt-icon"><svg><use xlinkHref="#icon-like" /></svg></i>
        <span className="tt-text">{reactions.filter(el => type === ReactionType.LIKE).length}</span>
      </a>
      <a href="#" className="tt-icon-btn">
        <i className="tt-icon"><svg><use xlinkHref="#icon-dislike" /></svg></i>
        <span className="tt-text">{reactions.filter(el => type === ReactionType.DISLIKE).length}</span>
      </a>
      <a href="#" className="tt-icon-btn">
        <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
        <span className="tt-text">{reactions.filter(el => type === ReactionType.LOVE).length}</span>
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
}

export default CommentBlock