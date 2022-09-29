import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import PostSetting from "@components/PopupSetting/post-setting"
import UserSetting from "@components/PopupSetting/user-setting"
import SvgSprite from "@components/SvgSprite"
import TopicList, { TopicListColumn } from "@components/TopicList"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IPost from "@interfaces/IPost"
import IUser from "@interfaces/IUser"
import { get as getPosts } from "@services/graphql/api/Post.api"
import { getByUsername } from "@services/graphql/api/User.api"
import { getCookies } from "cookies-next"
import PublicationState from "enums/PublicationState"
import jwtDecode from "jwt-decode"
import type { GetServerSideProps, NextPage } from 'next'
import Head from "next/head"
import { useEffect, useRef, useState } from "react"


const PageMe: NextPage<Props> = ({
  posts,
  me,
  itsMe
}: Props) => {
  const postSettingRef = useRef<{
    open: (p: IPost) => void
  }>();

  useEffect(() => {
    ((function ($) {
      var ttJsActiveBtn = $('#tt-pageContent .nav-tabs');
      if (ttJsActiveBtn.length) {
        ttJsActiveBtn.on('click', '.nav-link', function (e) {
          $(this).closest(ttJsActiveBtn).find('.nav-link').removeClass('active');
          $(this).addClass('active');

          $('.tab-content').find('.tab-pane').removeClass('active');
          $($(this).attr("href")).addClass('active');
          return false;
        });
      };
    }))(
      // @ts-ignore
      $
    )
  }, [])

  return <>
    <Head>
      <title>let d4zum = new DevForum(Trang của tôi)</title>
      <meta name="description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />

      <meta property="og:url" content="https://d4zum.me" />
      <meta property="og:title" content="let d4zum = new DevForum(Trang của tôi)" />
      <meta property="og:description" content="Dev Forum: Chia sẻ kiến thức, kinh nghiệm lập trình và những thứ liên quan" />
      {/* <meta property="og:image" content="https://d4zum.me/main-banner.jpg" /> */}
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent" className="tt-offset-small">
      <div className="tt-wrapper-section">
        <div className="container">
          <div className="tt-user-header">
            <div className="tt-col-avatar">
              <div className="tt-icon">
                <svg className="tt-icon">
                  <use xlinkHref={"#icon-ava-" + me?.name?.charAt?.(0)?.toLowerCase?.()} />
                </svg>
              </div>
            </div>
            <div className="tt-col-title">
              <div className="tt-title">
                {me?.name}
              </div>
              <ul className="tt-list-badge">
                {/* <li><a href="#"><span className="tt-color14 tt-badge">LVL : 26</span></a></li> */}
              </ul>
            </div>
            <div className="tt-col-btn" id="js-settings-btn">
              <div className="tt-list-btn">
                {itsMe && <a href="#" className="tt-btn-icon">
                  {/* <svg className="tt-icon">
                    <use xlinkHref="#icon-settings_fill" />
                  </svg> */}
                </a>}
                {/* <a href="#" className="btn btn-primary">Message</a> */}
                {!itsMe && <button type="button" className="btn btn-secondary">Theo dõi</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="tt-tab-wrapper">
          <div className="tt-wrapper-inner">
            <ul className="nav nav-tabs pt-tabs-default" role="tablist">
              <li className="nav-item show">
                <a className="nav-link active" data-toggle="tab" href="#tt-tab-threads" role="tab"><span>{posts.length} bài viết</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tt-tab-reactions" role="tab"><span>Tương tác</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tt-tab-comments" role="tab"><span>Bình luận</span></a>
              </li>
              <li className="nav-item tt-hide-xs">
                <a className="nav-link" data-toggle="tab" href="#tt-tab-followers" role="tab"><span>526 theo dõi</span></a>
              </li>
              <li className="nav-item tt-hide-md">
                <a className="nav-link" data-toggle="tab" href="#tt-tab-following" role="tab"><span>489 đang theo dõi</span></a>
              </li>
              {/* <li className="nav-item tt-hide-md">
                <a className="nav-link" data-toggle="tab" href="#tt-tab-06" role="tab"><span>Categories</span></a>
              </li> */}
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane tt-indent-none show active" id="tt-tab-threads" role="tabpanel">
              <TopicList posts={posts} columns={[
                TopicListColumn.TITLE,
                TopicListColumn.TOPIC,
                TopicListColumn.STATE,
                TopicListColumn.TIME_CREATED,
              ]} />
            </div>
            <div className="tab-pane tt-indent-none" id="tt-tab-reactions" role="tabpanel">
              <div className="tt-topic-list">
                <div className="tt-list-header">
                  <div className="tt-col-topic">Topic</div>
                  <div className="tt-col-value-large hide-mobile">Category</div>
                  <div className="tt-col-value-large hide-mobile">Status</div>
                  <div className="tt-col-value-large hide-mobile">Activity</div>
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
                    <div className="tt-col-message">
                      <a href="#">Dylan replied:</a> It’s time to channel your inner Magnum P.I., Ron Swanson or Hercule Poroit! It’s the time that all guys (or gals) love and all our partners hate It’s Movember!
                    </div>
                    <div className="row align-items-center no-gutters hide-desktope">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color05 tt-badge">music</span></a></li>
                        </ul>
                        <a href="#" className="tt-btn-icon show-mobile">
                          <i className="tt-icon"><svg><use xlinkHref="#icon-reply" /></svg></i>
                        </a>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">5 Jan,19</div>
                      </div>
                    </div>
                  </div>
                  <div className="tt-col-category tt-col-value-large hide-mobile"><span className="tt-color05 tt-badge">music</span></div>
                  <div className="tt-col-value-large hide-mobile">
                    <a href="#" className="tt-btn-icon">
                      <i className="tt-icon"><svg><use xlinkHref="#icon-reply" /></svg></i>
                    </a>
                  </div>
                  <div className="tt-col-value-large hide-mobile">5 Jan,19</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-h" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-locked" />
                      </svg>
                      We Want to Hear From You! What Would You Like?
                    </a></h6>
                    <div className="row align-items-center no-gutters hide-desktope">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color06 tt-badge">movies</span></a></li>
                        </ul>
                        <a href="#" className="tt-btn-icon show-mobile">
                          <i className="tt-icon"><svg><use xlinkHref="#icon-like" /></svg></i>
                        </a>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">5 Jan,19</div>
                      </div>
                    </div>
                  </div>
                  <div className="tt-col-category tt-col-value-large hide-mobile"><span className="tt-color06 tt-badge">movies</span></div>
                  <div className="tt-col-value-large hide-mobile">
                    <a href="#" className="tt-btn-icon">
                      <i className="tt-icon"><svg><use xlinkHref="#icon-like" /></svg></i>
                    </a>
                  </div>
                  <div className="tt-col-value-large hide-mobile">5 Jan,19</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-j" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      Seeking partner backend developer
                    </a></h6>
                    <div className="row align-items-center no-gutters">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color13 tt-badge">nature</span></a></li>
                          <li><a href="#"><span className="tt-badge">themeforest</span></a></li>
                          <li><a href="#"><span className="tt-badge">elements</span></a></li>
                        </ul>
                        <a href="#" className="tt-btn-icon show-mobile">
                          <i className="tt-icon"><svg><use xlinkHref="#icon-share" /></svg></i>
                        </a>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">4 Jan,19</div>
                      </div>
                    </div>
                  </div>
                  <div className="tt-col-category tt-col-value-large hide-mobile"><span className="tt-color13 tt-badge">nature</span></div>
                  <div className="tt-col-category tt-col-value-large hide-mobile">
                    <a href="#" className="tt-btn-icon">
                      <i className="tt-icon"><svg><use xlinkHref="#icon-share" /></svg></i>
                    </a>
                  </div>
                  <div className="tt-col-value-large hide-mobile">4 Jan,19</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-t" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      Cannot customize my intro
                    </a></h6>
                    <div className="tt-col-message">
                      <a href="#">Dylan replied:</a> I am noticed it will take little more time to review new authors submissions. All the Best
                    </div>
                    <div className="row align-items-center no-gutters hide-desktope">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color04 tt-badge">pets</span></a></li>
                        </ul>
                        <a href="#" className="tt-btn-icon show-mobile">
                          <i className="tt-icon"><svg><use xlinkHref="#icon-reply" /></svg></i>
                        </a>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">4 Jan,19</div>
                      </div>
                    </div>
                  </div>
                  <div className="tt-col-category tt-col-value-large hide-mobile"><span className="tt-color04 tt-badge">pets</span></div>
                  <div className="tt-col-value-large hide-mobile">
                    <a href="#" className="tt-btn-icon">
                      <i className="tt-icon"><svg><use xlinkHref="#icon-reply" /></svg></i>
                    </a>
                  </div>
                  <div className="tt-col-value-large hide-mobile">4 Jan,19</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-d" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      Web Hosting Packages for ThemeForest WordPress
                    </a></h6>
                    <div className="row align-items-center no-gutters">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color03 tt-badge">exchange</span></a></li>
                          <li><a href="#"><span className="tt-badge">themeforest</span></a></li>
                          <li><a href="#"><span className="tt-badge">elements</span></a></li>
                        </ul>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">4 Jan,19</div>
                      </div>
                    </div>
                  </div>
                  <div className="tt-col-category tt-col-value-large"><span className="tt-color03 tt-badge">exchange</span></div>
                  <div className="tt-col-value-large hide-mobile" />
                  <div className="tt-col-value-large hide-mobile">4 Jan,19</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-k" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-verified" />
                      </svg>
                      Microsoft Word and Power Point
                    </a></h6>
                    <div className="row align-items-center no-gutters hide-desktope">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color08 tt-badge">youtube</span></a></li>
                        </ul>
                        <a href="#" className="tt-btn-icon show-mobile">
                          <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
                        </a>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">3 Jan,19</div>
                      </div>
                    </div>
                  </div>
                  <div className="tt-col-category tt-col-value-large"><span className="tt-color08 tt-badge">youtube</span></div>
                  <div className="tt-col-value-large hide-mobile">
                    <a href="#" className="tt-btn-icon">
                      <i className="tt-icon"><svg><use xlinkHref="#icon-favorite" /></svg></i>
                    </a>
                  </div>
                  <div className="tt-col-value-large hide-mobile">3 Jan,19</div>
                </div>
                <div className="tt-row-btn">
                  <button type="button" className="btn-icon js-topiclist-showmore">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-load_lore_icon" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="tab-pane tt-indent-none" id="tt-tab-comments" role="tabpanel">
              <div className="tt-topic-list">
                <div className="tt-list-header">
                  <div className="tt-col-topic">Topic</div>
                  <div className="tt-col-category">Category</div>
                  <div className="tt-col-value">Activity</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-d" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      Does Envato act against the authors of Envato markets?
                    </a></h6>
                    <div className="row align-items-center no-gutters hide-desktope">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color06 tt-badge">movies</span></a></li>
                        </ul>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">5 Jan,19</div>
                      </div>
                    </div>
                    <div className="tt-content">
                      I really liked new badge - T-shirt. Will there be new contests with new badges for AudioJungle?
                    </div>
                  </div>
                  <div className="tt-col-category"><a href="#"><span className="tt-color06 tt-badge">movies</span></a></div>
                  <div className="tt-col-value-large hide-mobile">5 Jan,19</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-d" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      We Want to Hear From You! What Would You Like?
                    </a></h6>
                    <div className="row align-items-center no-gutters hide-desktope">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color15 tt-badge">nature</span></a></li>
                        </ul>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">5 Jan,19</div>
                      </div>
                    </div>
                    <div className="tt-content">
                      Can it be in not vector format but in very big resolution (far far beyond enough for print on shirts) ?
                    </div>
                  </div>
                  <div className="tt-col-category"><a href="#"><span className="tt-color15 tt-badge">nature</span></a></div>
                  <div className="tt-col-value-large hide-mobile">5 Jan,19</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-avatar">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-ava-d" />
                    </svg>
                  </div>
                  <div className="tt-col-description">
                    <h6 className="tt-title"><a href="#">
                      Seeking partner backend developer
                    </a></h6>
                    <div className="row align-items-center no-gutters hide-desktope">
                      <div className="col-9">
                        <ul className="tt-list-badge">
                          <li className="show-mobile"><a href="#"><span className="tt-color05 tt-badge">music</span></a></li>
                        </ul>
                      </div>
                      <div className="col-3 ml-auto show-mobile">
                        <div className="tt-value">5 Jan,19</div>
                      </div>
                    </div>
                    <div className="tt-content">
                      One more question -&gt; what is the maximum space (in cm or inches) the design can be?
                    </div>
                  </div>
                  <div className="tt-col-category"><a href="#"><span className="tt-color05 tt-badge">music</span></a></div>
                  <div className="tt-col-value-large hide-mobile">5 Jan,19</div>
                </div>
                <div className="tt-row-btn">
                  <button type="button" className="btn-icon js-topiclist-showmore">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-load_lore_icon" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="tab-pane tt-indent-none" id="tt-tab-followers" role="tabpanel">
              <div className="tt-followers-list">
                <div className="tt-list-header">
                  <div className="tt-col-name">User</div>
                  <div className="tt-col-value-large hide-mobile">Follow date</div>
                  <div className="tt-col-value-large hide-mobile">Last Activity</div>
                  <div className="tt-col-value-large hide-mobile">Threads</div>
                  <div className="tt-col-value-large hide-mobile">Replies</div>
                  <div className="tt-col-value">Level</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-merged">
                    <div className="tt-col-avatar">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-ava-m" />
                      </svg>
                    </div>
                    <div className="tt-col-description">
                      <h6 className="tt-title"><a href="#">Mitchell</a></h6>
                      <ul>
                        <li><a href="mailto:@mitchell73">@mitchell73</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="tt-col-value-large hide-mobile">05/01/2019</div>
                  <div className="tt-col-value-large hide-mobile tt-color-select">1 hours ago</div>
                  <div className="tt-col-value-large hide-mobile">1</div>
                  <div className="tt-col-value-large hide-mobile">3</div>
                  <div className="tt-col-value"><span className="tt-color19 tt-badge">LVL : 33</span></div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-merged">
                    <div className="tt-col-avatar">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-ava-v" />
                      </svg>
                    </div>
                    <div className="tt-col-description">
                      <h6 className="tt-title"><a href="#">Vans</a></h6>
                      <ul>
                        <li><a href="mailto:@vans49">@vans49</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="tt-col-value-large hide-mobile">04/01/2019</div>
                  <div className="tt-col-value-large hide-mobile tt-color-select">23 hours ago</div>
                  <div className="tt-col-value-large hide-mobile">4</div>
                  <div className="tt-col-value-large hide-mobile">9</div>
                  <div className="tt-col-value"><span className="tt-color20 tt-badge">LVL : 99</span></div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-merged">
                    <div className="tt-col-avatar">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-ava-b" />
                      </svg>
                    </div>
                    <div className="tt-col-description">
                      <h6 className="tt-title"><a href="#">Baker</a></h6>
                      <ul>
                        <li><a href="mailto:@baker65">@baker65</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="tt-col-value-large hide-mobile">03/01/2019</div>
                  <div className="tt-col-value-large hide-mobile tt-color-select">4 hours ago</div>
                  <div className="tt-col-value-large hide-mobile">28</div>
                  <div className="tt-col-value-large hide-mobile">86</div>
                  <div className="tt-col-value"><span className="tt-color07 tt-badge">LVL : 43</span></div>
                </div>
              </div>
            </div>
            <div className="tab-pane tt-indent-none" id="tt-tab-following" role="tabpanel">
              <div className="tt-followers-list">
                <div className="tt-list-header">
                  <div className="tt-col-name">User</div>
                  <div className="tt-col-value-large hide-mobile">Follow date</div>
                  <div className="tt-col-value-large hide-mobile">Last Activity</div>
                  <div className="tt-col-value-large hide-mobile">Threads</div>
                  <div className="tt-col-value-large hide-mobile">Replies</div>
                  <div className="tt-col-value">Level</div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-merged">
                    <div className="tt-col-avatar">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-ava-v" />
                      </svg>
                    </div>
                    <div className="tt-col-description">
                      <h6 className="tt-title"><a href="#">Vans</a></h6>
                      <ul>
                        <li><a href="mailto:@vans49">@vans49</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="tt-col-value-large hide-mobile">04/01/2019</div>
                  <div className="tt-col-value-large hide-mobile tt-color-select">23 hours ago</div>
                  <div className="tt-col-value-large hide-mobile">4</div>
                  <div className="tt-col-value-large hide-mobile">9</div>
                  <div className="tt-col-value"><span className="tt-color20 tt-badge">LVL : 99</span></div>
                </div>
                <div className="tt-item">
                  <div className="tt-col-merged">
                    <div className="tt-col-avatar">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-ava-b" />
                      </svg>
                    </div>
                    <div className="tt-col-description">
                      <h6 className="tt-title"><a href="#">Baker</a></h6>
                      <ul>
                        <li><a href="mailto:@baker65">@baker65</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="tt-col-value-large hide-mobile">03/01/2019</div>
                  <div className="tt-col-value-large hide-mobile tt-color-select">4 hours ago</div>
                  <div className="tt-col-value-large hide-mobile">28</div>
                  <div className="tt-col-value-large hide-mobile">86</div>
                  <div className="tt-col-value"><span className="tt-color07 tt-badge">LVL : 43</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <UserSetting />
    <PostSetting ref={postSettingRef} />
    <SvgSprite />
  </>
}

interface Props {
  posts: IPost[],
  me?: IUser,
  itsMe?: boolean
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let cookies = getCookies({
    req: context.req,
    res: context.res,
  })

  if ((!cookies["jwt"] || !cookies["secret"])) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const jwtData: IJwtAuthenticateData = jwtDecode(cookies["jwt"]?.toString?.())
  const userData = await getByUsername(jwtData.username)

  if (!jwtData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const posts = await getPosts({
    userId: jwtData?.id,
    state: PublicationState.PREVIEW
  })

  return {
    props: {
      posts,
      me: userData,
      itsMe: true
    }
  };
}

export default PageMe
