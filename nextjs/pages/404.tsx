import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SuggestedTopic from "@components/SuggestedTopic"
import SvgSprite from "@components/SvgSprite"
import type { NextPage } from 'next'
import Head from "next/head"

const Page404: NextPage = () => {
  return <>
    <Head>
      <title>let d4zum = new DevForum(404)</title>
      <meta name="description" content={`Không tìm thấy nội dung yêu cầu`} />

      <meta property="og:url" content={`https://d4zum.me`} />
      <meta property="og:title" content="let d4zum = new DevForum(404)" />
      <meta property="og:description" content={`Không tìm thấy nội dung yêu cầu`} />
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent">
      <div className="container">
        <div className="tt-layout-404">
          <span className="tt-icon">
            <svg className="icon">
              <use xlinkHref="#icon-error_404" />
            </svg>
          </span>
          <h6 className="tt-title">ERROR 404</h6>
          <p>Chúng tôi cũng không thể tìm thấy những gì mà bạn đang tìm, đây là những gì<br />
            {/* <a href="index.html" className="tt-color-dark tt-underline-02">suggested topics</a> for you.</p> */}
            chúng tôi có thể gợi ý cho bạn
          </p>
        </div>

        <SuggestedTopic />
      </div>
    </main>


    <SvgSprite />
  </>
}

export default Page404
