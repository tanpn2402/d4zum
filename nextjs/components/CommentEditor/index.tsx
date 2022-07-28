import initEditor from "@components/Editor/init"
import IComment from "@interfaces/IComment"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

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
    (function (ClassicEditor) {
      if (ClassicEditor && !cmtEditor) {
        initEditor(ClassicEditor, {
          secret: getCookie("secret")?.toString?.(),
          element: document.querySelector('.editor'),
          toolbar: [
            'codeBlock',
            'imageInsert',
            '|',
            'undo',
            'redo'
          ]
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
  }, [])

  const handlePostComment = async () => {
    const body = {
      content: cmtEditor.getData(),
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
          cmtEditor.setData("")
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

  return <div>
    <div className="pt-editor form-default pt-commentor">
      <h6 className="pt-title">Viết bình luận</h6>
      <div className="mb-4 p-0 tt-single-topic">
        <div className="tt-item-description">
          <div className="editor"></div>
        </div>
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