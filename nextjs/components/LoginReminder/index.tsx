import Link from "next/link"


const LoginReminder = () => {
  return <div className="tt-item tt-item-popup">
    <div className="tt-col-avatar">
      <svg className="tt-icon">
        <use xlinkHref="#icon-ava-f" />
      </svg>
    </div>
    <div className="tt-col-message">
      Có vẻ như bạn là newbie. Đăng kí đi vì có nhiều thứ hay ho đang chờ bạn đấy.
    </div>
    <div className="tt-col-btn">
      <Link href="/login">
        <a type="button" className="btn btn-primary">Đăng nhập</a>
      </Link>
      <Link href="/signup">
        <a type="button" className="btn btn-secondary">Đăng kí</a>
      </Link>
      <button type="button" className="btn-icon">
        <svg className="tt-icon">
          <use xlinkHref="#icon-cancel" />
        </svg>
      </button>
    </div>
  </div>
}

export default LoginReminder