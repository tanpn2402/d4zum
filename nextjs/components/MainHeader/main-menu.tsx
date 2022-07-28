

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect } from "react"
import onLoad from "./main-menu-onload"


const DynamicMenu = dynamic(() => import('./dynamic-menu'), {
  ssr: false
})

const MainMenu = () => {

  useEffect(() => {
    // @ts-ignore
    onLoad($)
  }, [])

  return <div className="tt-desktop-menu">
    <nav>
      <ul>
        <li>
          <Link href="/categories">
            <a><span>Chủ đề</span></a>
          </Link>
        </li>
        <li>
          <Link href="/trending">
            <a><span>Xu hướng</span></a>
          </Link>
        </li>
        <DynamicMenu />
        {/* <li>
          <a href="page-single-user.html"><span>Pages</span></a>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="page-single-topic.html">Single Topic</a></li>
            <li><a href="page-create-topic.html">Create Topic</a></li>
            <li><a href="page-single-user.html">Single User Activity</a></li>
            <li><a href="page-single_threads.html">Single User Threads</a></li>
            <li><a href="page-single_replies.html">Single User Replies</a></li>
            <li><a href="page-single_followers.html">Single User Followers</a></li>
            <li><a href="page-single_categories.html">Single User Categories</a></li>
            <li><a href="page-single_settings.html">Single User Settings</a></li>
            <li><a href="page-signup.html">Sign up</a></li>
            <li><a href="page-login.html">Log in</a></li>
            <li><a href="page-categories.html">Categories</a></li>
            <li><a href="page-categories-single.html">Single Category</a></li>
            <li><a href="page-tabs.html">About</a></li>
            <li><a href="page-tabs_guidelines.html">Guidelines</a></li>
            <li><a href="_demo_modal-advancedSearch.html">Advanced Search</a></li>
            <li><a href="error404.html">Error 404</a></li>
            <li><a href="_demo_modal-age-confirmation.html">Age Verification</a></li>
            <li><a href="_demo_modal-level-up.html">Level up Notification</a></li>
            <li><a href="messages-page.html">Message</a></li>
            <li><a href="messages-compose.html">Message Compose</a></li>
          </ul>
        </li> */}
      </ul>
    </nav>
  </div>

}

export default MainMenu