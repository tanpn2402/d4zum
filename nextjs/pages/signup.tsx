import { generateUuid } from "@utils/helper"
import { getCookies, setCookie } from "cookies-next"
import type { GetServerSideProps, NextPage } from 'next'
import Link from "next/link"
import { useRouter } from "next/router"

const PageSignUp: NextPage = ({
  token
}: Props) => {
  const router = useRouter()
  const { error, cb: cbUrl } = router.query

  return <>
    <main id="tt-pageContent" className="tt-offset-none">
      <div className="container">
        <div className="tt-loginpages-wrapper">
          <div className="tt-loginpages">
            <Link href="/">
              <a className="tt-block-title">
                <img src="images/logo.png" alt="" />
                <div className="tt-title">
                  Welcome to d4z
                </div>
                <div className="tt-description">
                  Đăng kí để khám phá những sự thú vị..
                </div>
              </a>
            </Link>
            <form className="form-default" action="/api/v1/auth/register" method="POST">
              <div className="form-group">
                <label htmlFor="userName">Tên hiển thị</label>
                <input type="text" name="name" className="form-control" id="userName" placeholder="d4z_name" />
              </div>
              <div className="form-group">
                <label htmlFor="loginUserName">Username</label>
                <input type="text" name="username" className="form-control" id="loginUserName" placeholder="d4z_username" />
              </div>
              <div className="form-group">
                <label htmlFor="loginUserEmail">Email</label>
                <input type="text" name="email" className="form-control" id="loginUserEmail" placeholder="d4z@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="loginUserPassword">Password</label>
                <input type="password" name="password" className="form-control" id="loginUserPassword" placeholder="************" />
              </div>
              <div className="form-group hidden">
                <input type="hidden" name="csrf" className="form-control" value={token} />
                <input type="hidden" name="cbUrl" className="form-control" value={cbUrl} />
              </div>
              <div className="form-group">
                <button typeof="button" className="btn btn-secondary btn-block">Tạo tài khoản</button>
              </div>
              {error && error !== "" && <>
                <div className="tt-single-topic-list">
                  <div className="tt-item tt-wrapper-danger px-4 py-2 mb-4 mt-2">
                    {error === "PerrmissionDenied" ? "Token đã hết hạn, hãy đăng kí lại nhé" : "Username hoặc Email đã được sử dụng"}
                  </div>
                </div>
              </>}

              <p>Có tài khoản rồi? Vậy thì <Link href={`/login?cb=${encodeURIComponent(cbUrl)}`}><a className="tt-underline">đăng nhập đi</a></Link></p>
              {/* <div className="tt-notes">
                By signing up, signing in or continuing, I agree to
                Forum19’s <a href="#" className="tt-underline">Terms of Use</a> and <a href="#" className="tt-underline">Privacy Policy.</a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </main>
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

export default PageSignUp
