import IComment from "@interfaces/IComment"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import Showdown from "showdown"

type Props = {
  postId: string,
  onCreateCommentCB?: (p: IComment) => void
}

const CommentEditor = ({
  postId,
  onCreateCommentCB
}: Props) => {
  const [cmtEditor, setCmtEditor] = useState<any>(null)

  useEffect(() => {
    (function (SimpleMDE) {
      if (!cmtEditor && SimpleMDE) {
        const editor = new SimpleMDE({
          element: document.getElementById("cmtEditor"),
          autofocus: false,
          toolbar: ["code", "preview"],
          renderingConfig: {
            codeSyntaxHighlighting: true
          }
        });
        setCmtEditor(editor)
      }
    })(
      // @ts-ignore
      SimpleMDE
    )
  }, [])

  const handlePostComment = async () => {
    const body = {
      content: (new Showdown.Converter()).makeHtml(cmtEditor.value()),
      postId: (postId)
    }

    fetch("/api/v1/post/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(async resp => {
        let json = await resp.json();
        console.log(json);
        if (resp.status === 200) {
          cmtEditor.value("")
          if (onCreateCommentCB) {
            onCreateCommentCB(json.data as IComment)
          }
        }
        else {
          throw json.error
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return <div className="tt-wrapper-inner">
    <div className="pt-editor form-default">
      <h6 className="pt-title">Viết bình luận</h6>

      <div className="form-group">
        <textarea id="cmtEditor" name="message" className="form-control" rows={5} placeholder="Ý của bạn là..." defaultValue={""} />
      </div>
      <div className="pt-row">
        <div className="col-auto">
          {/* <div className="checkbox-group">
            <input type="checkbox" id="checkBox21" name="checkbox" defaultChecked />
            <label htmlFor="checkBox21">
              <span className="check" />
              <span className="box" />
              <span className="tt-text">Subscribe to this topic.</span>
            </label>
          </div> */}
        </div>
        <div className="col-auto">
          <button className="btn btn-secondary btn-width-lg" onClick={() => handlePostComment()}>Bình luận</button>
        </div>
      </div>
    </div>
  </div>
}

export default (props: Props) => {
  const jwtToken = getCookie("jwt")
  if (jwtToken) {
    return <CommentEditor {...props} />
  }
  else {
    return null
  }
}