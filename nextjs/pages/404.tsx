import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SuggestedTopic from "@components/SuggestedTopic"
import SvgSprite from "@components/SvgSprite"
import type { NextPage } from 'next'

const Page404: NextPage = () => {
  return <>
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
          <p>Sorry we can’t find what you are looking for, here’s some<br />
            <a href="index.html" className="tt-color-dark tt-underline-02">suggested topics</a> for you.</p>
        </div>
        
        <SuggestedTopic />
      </div>
    </main>


    <SvgSprite />
  </>
}

export default Page404
