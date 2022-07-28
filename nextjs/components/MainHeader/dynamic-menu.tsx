

import { getCookie } from "cookies-next"
import Link from "next/link"
import React from "react"

const DynamicMenu = () => {
  const jwtToken = getCookie("jwt")
  if (jwtToken) {
    return <>
      <li>
        <Link href="/new-post">
          <a><span>Viết bài</span></a>
        </Link>
      </li>
    </>
  }
  return null
}

export default DynamicMenu