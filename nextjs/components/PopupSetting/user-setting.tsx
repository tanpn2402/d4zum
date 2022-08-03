const UserSetting = () => {

  return <div id="js-popup-settings" className="tt-popup-settings">
    <div className="tt-btn-col-close">
      <a href="#">
        <span className="tt-icon-title">
          <svg>
            <use xlinkHref="#icon-settings_fill" />
          </svg>
        </span>
        <span className="tt-icon-text">
          Settings
        </span>
        <span className="tt-icon-close">
          <svg>
            <use xlinkHref="#icon-cancel" />
          </svg>
        </span>
      </a>
    </div>
    <form className="form-default">
      <div className="tt-form-upload">
        <div className="row no-gutter">
          <div className="col-auto">
            <div className="tt-avatar">
              <svg>
                <use xlinkHref="#icon-ava-d" />
              </svg>
            </div>
          </div>
          <div className="col-auto ml-auto">
            <a href="#" className="btn btn-primary">Upload Picture</a>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="settingsUserName">Username</label>
        <input type="text" name="name" className="form-control" id="settingsUserName" placeholder="azyrusmax" />
      </div>
      <div className="form-group">
        <label htmlFor="settingsUserEmail">Email</label>
        <input type="text" name="name" className="form-control" id="settingsUserEmail" placeholder="Sample@sample.com" />
      </div>
      <div className="form-group">
        <label htmlFor="settingsUserPassword">Password</label>
        <input type="password" name="name" className="form-control" id="settingsUserPassword" placeholder="************" />
      </div>
      <div className="form-group">
        <label htmlFor="settingsUserLocation">Location</label>
        <input type="text" name="name" className="form-control" id="settingsUserLocation" placeholder="Slovakia" />
      </div>
      <div className="form-group">
        <label htmlFor="settingsUserWebsite">Website</label>
        <input type="text" name="name" className="form-control" id="settingsUserWebsite" placeholder="Sample.com" />
      </div>
      <div className="form-group">
        <label htmlFor="settingsUserAbout">About</label>
        <textarea name="about" placeholder="Few words about you" className="form-control" id="settingsUserAbout" defaultValue={""} />
      </div>
      <div className="form-group">
        <label htmlFor="settingsUserAbout">Notify me via Email</label>
        <div className="checkbox-group">
          <input type="checkbox" id="settingsCheckBox01" name="checkbox" />
          <label htmlFor="settingsCheckBox01">
            <span className="check" />
            <span className="box" />
            <span className="tt-text">When someone replies to my thread</span>
          </label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="settingsCheckBox02" name="checkbox" />
          <label htmlFor="settingsCheckBox02">
            <span className="check" />
            <span className="box" />
            <span className="tt-text">When someone likes my thread or reply</span>
          </label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="settingsCheckBox03" name="checkbox" />
          <label htmlFor="settingsCheckBox03">
            <span className="check" />
            <span className="box" />
            <span className="tt-text">When someone mentions me</span>
          </label>
        </div>
      </div>
      <div className="form-group">
        <a href="#" className="btn btn-secondary">Save</a>
      </div>
    </form>
  </div>
}

export default UserSetting