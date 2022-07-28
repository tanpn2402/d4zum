import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SuggestedTopic from "@components/SuggestedTopic"
import SvgSprite from "@components/SvgSprite"
import type { NextPage } from 'next'
import Link from "next/link"

const PagePrivatePost: NextPage = () => {
  return <>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent">
      <div className="container">
        <div className="tt-layout-404">
          <span className="tt-icon">
            <svg className="icon">
              <use xlinkHref="#icon-locked" />
            </svg>
          </span>
          <h6 className="tt-title">Bài viết bị giới hạn</h6>
          <p>Chủ bài viết đã bật chế độ giới hạn cho bài viết này,<br />
            {/* <a href="index.html" className="tt-color-dark tt-underline-02">suggested topics</a> for you.</p> */}
            bạn cần <Link href="/login"><a>đăng nhập</a></Link> để xem
          </p>
        </div>

        <SuggestedTopic />
      </div>
    </main>


    <SvgSprite />
  </>
}

export default PagePrivatePost
