import IPost from "@interfaces/IPost"
import Link from "next/link"
import { useRouter } from "next/router"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

const PostSetting = (props: any, ref: any) => {
  const router = useRouter()
  const [post, setPostData] = useState<IPost>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    (function ($) {
      var $body = $('body'),
        $html = $('html'),
        $popupSettings = $('#js-post-settings')

      if (isOpen) {
        $popupSettings.addClass('column-open');
        var ptScrollValue = $body.scrollTop() || $html.scrollTop();
        $popupSettings.perfectScrollbar();
        $body.css("top", - ptScrollValue).addClass("no-scroll").append('<div class="modal-filter"></div>');
        var modalFilter = $('.modal-filter').fadeTo('fast', 1);
        if (modalFilter.length) {
          modalFilter.on('click', function () {
            handleClose()
          })
        };
      }
      else {
        $popupSettings.removeClass('column-open').perfectScrollbar('destroy');
        var top = parseInt($body.css("top").replace("px", ""), 10) * -1;
        $body.removeAttr("style").removeClass("no-scroll").scrollTop(top);
        $html.removeAttr("style").scrollTop(top);
        $(".modal-filter").off().remove();
      }
    })(
      // @ts-ignore
      $
    )

  }, [isOpen])

  useImperativeHandle(ref, () => ({
    open: (p: IPost) => {
      setPostData(p)
      setIsOpen(true)
    }
  }));

  const handleClose = () => {
    setPostData(null)
    setIsOpen(false)
  }

  const togglePushlish = async () => {
    fetch("/api/v1/post/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        slug: post?.slug
      })
    })
      .then(async resp => {
        let json: {
          error: any
          data: IPost
        } = await resp.json();
        if (resp.status === 200) {
          router.reload()
          // handleClose()
          // if (json.data?.publishedAt === null) {
          //   // 
          // }
          // else {
          //   router.push("/p/" + json.data?.slug)
          // }
        }
        else {
          throw json.error
        }
      })
      .catch(error => {
        console.log(error)

      })
  }

  return <div id="js-post-settings" className="tt-popup-settings">
    <div className="tt-btn-col-close">
      <a href="#" onClick={() => handleClose()}>
        <span className="tt-icon-text">
          Cài đặt bài viết
        </span>
        <span className="tt-icon-close">
          <svg>
            <use xlinkHref="#icon-cancel" />
          </svg>
        </span>
      </a>
    </div>
    <div className="form-group mb-4">
      <label>{post?.title}</label>
    </div>
    <div className="form-group d-flex flex-column">
      <Link href={`/edit-post?slug=${post?.slug}`}>
        <a onClick={() => handleClose()} className="btn btn-secondary mb-2 w-100">Sửa bài</a>
      </Link>
      {post?.publishedAt === null && <button className="btn btn-primary w-100 mb-4" onClick={() => togglePushlish()}>Đăng bài</button>}
      {post?.publishedAt !== null && <button className="btn btn-primary w-100 mb-4" onClick={() => togglePushlish()}>Gỡ bài</button>}
      <hr></hr>
      {/* <button className="btn btn-danger w-100 mt-4">Xóa bài</button> */}
    </div>
  </div >
}

export default forwardRef(PostSetting)