
const UserMenu = () => {

  return <div className="tt-user-info d-flex justify-content-center">
    {/* <a href="#" className="tt-btn-icon">
      <i className="tt-icon"><svg><use xlinkHref="#icon-notification" /></svg></i>
    </a> */}
    <div className="tt-avatar-icon tt-size-md">
      <i className="tt-icon"><svg><use xlinkHref="#icon-ava-a" /></svg></i>
    </div>
    <div className="custom-select-01">
      <select>
        <option value="Default Sorting">azyrusmax</option>
        <option value="value 01">value 01</option>
        <option value="value 02">value 02</option>
      </select>
    </div>
  </div>

}

export default UserMenu