import { generateUuid } from "@utils/helper"
import { getCookies, setCookie } from "cookies-next"
import type { GetServerSideProps, NextPage } from 'next'
import Link from "next/link"
import { useRouter } from "next/router"

const PageLogin: NextPage = ({
  token
}: Props) => {
  const router = useRouter()
  const { error, username, cb: cbUrl } = router.query

  return <>
    <main id="tt-pageContent" className="tt-offset-none">
      <div className="container">
        <div className="tt-loginpages-wrapper">
          <div className="tt-loginpages">
            <Link href="/">
              <a className="tt-block-title">
                <img src="images/logo.png" alt="" style={{ width: "128px" }} />
                <div className="tt-title">
                  Welcome to d4z
                </div>
                <div className="tt-description">
                  Đăng nhập để khám phá những sự thú vị.
                </div>
              </a>
            </Link>
            <form className="form-default" action="/api/v1/auth/login" method="POST">
              <div className="form-group">
                <label htmlFor="loginUserName">Username</label>
                <input type="text" name="username" className="form-control" id="loginUserName" placeholder="d4z_awesome" defaultValue={username} />
              </div>
              <div className="form-group">
                <label htmlFor="loginUserPassword">Password</label>
                <input type="password" name="password" className="form-control" id="loginUserPassword" placeholder="************" />
              </div>
              <div className="form-group hidden">
                <input type="hidden" name="csrf" className="form-control" value={token} />
                <input type="hidden" name="cbUrl" className="form-control" value={cbUrl} />
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input type="checkbox" id="settingsCheckBox01" name="is_remember" />
                      <label htmlFor="settingsCheckBox01">
                        <span className="check" />
                        <span className="box" />
                        <span className="tt-text">Nhớ tôi trong vòng 1 tháng</span>
                      </label>
                    </div>
                  </div>
                </div>
                {error && error !== "" && <>
                  <div className="tt-single-topic-list">
                    <div className="tt-item tt-wrapper-danger px-4 py-2 mb-4 mt-2">
                      {error === "PleaseInsertRightValues" ? "Vui lòng nhập đúng thông tin" :
                        "Sai tên tài khoản hoặc mật khẩu"}
                    </div>
                  </div>
                </>}
                {/* <div className="col ml-auto text-right">
                  <a href="#" className="tt-underline">Forgot Password</a>
                </div> */}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-secondary btn-block">Vô</button>
              </div>
              <p>Không có tài khoản? Đừng lo, hãy <Link href={`/signup?cb=${encodeURIComponent(cbUrl as string)}`}><a className="tt-underline">đăng kí đi</a></Link></p>
              {/* <div className="tt-notes">
                By Logging in, signing in or continuing, I agree to
                Forum19’s <a href="#" className="tt-underline">Terms of Use</a> and <a href="#" className="tt-underline">Privacy Policy.</a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </main >
  </>
}

type Props = {
  token?: any
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let cookies = getCookies({
    req: context.req,
    res: context.res,
  })

  if (cookies["jwt"]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const token = generateUuid()
  setCookie("token", token, {
    req: context.req,
    res: context.res,
    maxAge: 365 * 24 * 60 * 60
  });

  return {
    props: {
      token
    }
  };
}

export default PageLogin
