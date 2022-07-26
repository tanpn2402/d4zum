
const SuggestedTopic = () => {
  return <div className="tt-topic-list tt-ofset-30">
    <div className="tt-list-search">
      <div className="tt-title">Các gợi ý dành cho bạn</div>
      {/* tt-search */}
      {/* <div className="tt-search">
        <form className="search-wrapper">
          <div className="search-form">
            <input type="text" className="tt-search__input" placeholder="Search for topics" />
            <button className="tt-search__btn" type="submit">
              <svg className="tt-icon">
                <use xlinkHref="#icon-search" />
              </svg>
            </button>
            <button className="tt-search__close">
              <svg className="tt-icon">
                <use xlinkHref="#icon-cancel" />
              </svg>
            </button>
          </div>
        </form>
      </div> */}
      {/* /tt-search */}
    </div>
    <div className="tt-list-header tt-border-bottom">
      <div className="tt-col-topic">Bài viết</div>
      <div className="tt-col-category">Danh mục</div>
      <div className="tt-col-value hide-mobile">Thao tác</div>
      <div className="tt-col-value hide-mobile">Bình luận</div>
      <div className="tt-col-value">Thời gian</div>
    </div>
    <div className="tt-item">
      <div className="tt-col-avatar">
        <svg className="tt-icon">
          <use xlinkHref="#icon-ava-n" />
        </svg>
      </div>
      <div className="tt-col-description">
        <h6 className="tt-title"><a href="#">
          Does Envato act against the authors of Envato markets?
        </a></h6>
        <div className="row align-items-center no-gutters hide-desktope">
          <div className="col-11">
            <ul className="tt-list-badge">
              <li className="show-mobile"><a href="#"><span className="tt-color05 tt-badge">music</span></a></li>
            </ul>
          </div>
          <div className="col-1 ms-auto show-mobile">
            <div className="tt-value">1d</div>
          </div>
        </div>
      </div>
      <div className="tt-col-category"><span className="tt-color05 tt-badge">music</span></div>
      <div className="tt-col-value hide-mobile">358</div>
      <div className="tt-col-value hide-mobile">1d</div>
    </div>
  </div>
}

export default SuggestedTopic