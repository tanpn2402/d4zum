import dynamic from "next/dynamic"
import Link from "next/link"
import MainMenu from "./main-menu"

const UserMenu = dynamic(() => import('./user-menu'), {
  ssr: false
})

const MainHeader = () => {
  return <header id="tt-header">
    <div className="container">
      <div className="row tt-row no-gutters">
        <div className="col-auto">
          {/* toggle mobile menu */}
          <Link href="/">
            <a className="toggle-mobile-menu">
              <svg className="tt-icon">
                <use xlinkHref="#icon-menu_icon" />
              </svg>
            </a>
          </Link>
          {/* /toggle mobile menu */}
          {/* logo */}
          <div className="tt-logo">
            <Link href="/">
              <a><img src="/images/logo.png" alt="" /></a>
            </Link>
          </div>
          {/* /logo */}
          {/* desctop menu */}
          <MainMenu />
          {/* /desctop menu */}
          {/* tt-search */}
          <div className="tt-search hidden">
            {/* toggle */}
            <button className="tt-search-toggle" data-toggle="modal" data-target="#modalAdvancedSearch">
              <svg className="tt-icon">
                <use xlinkHref="#icon-search" />
              </svg>
            </button>
            {/* /toggle */}
            <form className="search-wrapper">
              <div className="search-form">
                <input type="text" className="tt-search__input" placeholder="Search" />
                <button className="tt-search__btn" type="submit">
                  <svg className="tt-icon">
                    <use xlinkHref="#icon-search" />
                  </svg>
                </button>
                <button className="tt-search__close">
                  <svg className="tt-icon">
                    <use xlinkHref="#cancel" />
                  </svg>
                </button>
              </div>
              <div className="search-results">
                <div className="tt-search-scroll">
                  <ul>
                    <li>
                      <a href="page-single-topic.html">
                        <h6 className="tt-title">Rdr2 secret easter eggs</h6>
                        <div className="tt-description">
                          Here’s what I’ve found in Red Dead Redem..
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="page-single-topic.html">
                        <h6 className="tt-title">Top 10 easter eggs in Red Dead Rede..</h6>
                        <div className="tt-description">
                          You can find these easter eggs in Red Dea..
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="page-single-topic.html">
                        <h6 className="tt-title">Red Dead Redemtion: Arthur Morgan..</h6>
                        <div className="tt-description">
                          Here’s what I’ve found in Red Dead Redem..
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="page-single-topic.html">
                        <h6 className="tt-title">Rdr2 secret easter eggs</h6>
                        <div className="tt-description">
                          Here’s what I’ve found in Red Dead Redem..
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="page-single-topic.html">
                        <h6 className="tt-title">Top 10 easter eggs in Red Dead Rede..</h6>
                        <div className="tt-description">
                          You can find these easter eggs in Red Dea..
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="page-single-topic.html">
                        <h6 className="tt-title">Red Dead Redemtion: Arthur Morgan..</h6>
                        <div className="tt-description">
                          Here’s what I’ve found in Red Dead Redem..
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <button type="button" className="tt-view-all" data-toggle="modal" data-target="#modalAdvancedSearch">Advanced Search</button>
              </div>
            </form>
          </div>
          {/* /tt-search */}
        </div>
        <div className="col-auto ms-auto">
          <UserMenu />
        </div>
      </div>
    </div>
  </header>
}

export default MainHeader