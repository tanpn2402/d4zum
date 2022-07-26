import type { NextPage } from 'next'
import Link from "next/link"

const PageSignUp: NextPage = () => {
  return <>
    <main id="tt-pageContent" className="tt-offset-none">
      <div className="container">
        <div className="tt-loginpages-wrapper">
          <div className="tt-loginpages">
            <Link href="/">
              <a className="tt-block-title">
                <img src="images/logo.png" alt="" />
                <div className="tt-title">
                  Welcome to Forum19
                </div>
                <div className="tt-description">
                  Join the forum to unlock true power of community.
                </div>
              </a>
            </Link>
            <form className="form-default">
              <div className="form-group">
                <label htmlFor="loginUserName">Username</label>
                <input type="text" name="name" className="form-control" id="loginUserName" placeholder="azyrusmax" />
              </div>
              <div className="form-group">
                <label htmlFor="loginUserEmail">Email</label>
                <input type="text" name="name" className="form-control" id="loginUserEmail" placeholder="Sample@sample.com" />
              </div>
              <div className="form-group">
                <label htmlFor="loginUserPassword">Password</label>
                <input type="password" name="name" className="form-control" id="loginUserPassword" placeholder="************" />
              </div>
              <div className="form-group">
                <a href="#" className="btn btn-secondary btn-block">Create my account</a>
              </div>

              <p>Already have an account? <Link href="/login"><a className="tt-underline">Login here</a></Link></p>
              <div className="tt-notes">
                By signing up, signing in or continuing, I agree to
                Forum19’s <a href="#" className="tt-underline">Terms of Use</a> and <a href="#" className="tt-underline">Privacy Policy.</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </>
}

export default PageSignUp
