import { useEffect } from "react"
import onLoad from "./mobile-menu-onload"

{/* tt-mobile menu */ }
const MobileMenu = () => {

  useEffect(() => {
    // @ts-ignore
    onLoad($)
  }, [])

  return <nav className="panel-menu" id="mobile-menu">
    <ul>
    </ul>
    <div className="mm-navbtn-names">
      <div className="mm-closebtn">
        Close
        <div className="tt-icon">
          <svg>
            <use xlinkHref="#icon-cancel" />
          </svg>
        </div>
      </div>
      <div className="mm-backbtn">Back</div>
    </div>
  </nav>

}

export default MobileMenu