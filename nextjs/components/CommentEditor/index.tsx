import { useEffect, useState } from "react"
import Showdown from "showdown"

const CommentEditor = () => {
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
      content: (new Showdown.Converter()).makeHtml(cmtEditor.value())
    }

    console.log(body);
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

export default CommentEditor