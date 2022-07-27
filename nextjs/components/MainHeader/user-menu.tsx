import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData";
import { getCookie } from "cookies-next"
import jwtDecode from "jwt-decode"
import Link from "next/link";

const UserMenu = () => {
  const token = getCookie("token")
  const jwtToken = getCookie("jwt")
  if (jwtToken) {
    const jwtData: IJwtAuthenticateData = jwtDecode(jwtToken.toString())

    return <>
      <div className="tt-user-info d-flex justify-content-center">
        {/* <a href="#" className="tt-btn-icon">
          <i className="tt-icon"><svg><use xlinkHref="#icon-notification" /></svg></i>
        </a> */}
        <div className="tt-avatar-icon tt-size-md">
          <i className="tt-icon"><svg><use xlinkHref={"#icon-ava-" + jwtData.name?.trim?.()?.charAt?.(0)?.toLowerCase?.()} /></svg></i>
        </div>
        <div className="tt-username d-flex align-items-center ms-2">{jwtData.name}</div>
      </div>
      <div className="tt-account-btn ms-3">
        <form action="/api/v1/auth/logout" method="POST">
          <input type="hidden" name="csrf" className="form-control" value={token?.toString()} />
          <button type="submit" className="btn btn-primary">
            <i className="tt-icon"><svg><use xlinkHref="#logout" /></svg></i>
          </button>
        </form>
      </div>
    </>
  }
  else {

    return <div className="tt-account-btn">
      <Link href={`/login?cb=${encodeURIComponent(window.location.pathname)}`}>
        <a className="btn btn-primary">Đăng nhập</a>
      </Link>
      <Link href={`/signup?cb=${encodeURIComponent(window.location.pathname)}`}>
        <a className="btn btn-secondary">Đăng kí</a>
      </Link>
    </div>
  }
}

export default UserMenu