

const CommentEditor = () => {
  return <div className="tt-wrapper-inner">
    <div className="pt-editor form-default">
      <h6 className="pt-title">Post Your Reply</h6>
      <div className="pt-row">
        <div className="col-left">
          <ul className="pt-edit-btn">
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-quote" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-bold" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-italic" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-share_topic" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-blockquote" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-performatted" />
              </svg>
            </button></li>
            <li className="hr" />
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-upload_files" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-bullet_list" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-heading" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-horizontal_line" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-emoticon" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-settings" />
              </svg>
            </button></li>
            <li><button type="button" className="btn-icon">
              <svg className="tt-icon">
                <use xlinkHref="#icon-color_picker" />
              </svg>
            </button></li>
          </ul>
        </div>
        <div className="col-right tt-hidden-mobile">
          <a href="#" className="btn btn-primary">Preview</a>
        </div>
      </div>
      <div className="form-group">
        <textarea name="message" className="form-control" rows={5} placeholder="Lets get started" defaultValue={""} />
      </div>
      <div className="pt-row">
        <div className="col-auto">
          <div className="checkbox-group">
            <input type="checkbox" id="checkBox21" name="checkbox" defaultChecked />
            <label htmlFor="checkBox21">
              <span className="check" />
              <span className="box" />
              <span className="tt-text">Subscribe to this topic.</span>
            </label>
          </div>
        </div>
        <div className="col-auto">
          <a href="#" className="btn btn-secondary btn-width-lg">Reply</a>
        </div>
      </div>
    </div>
  </div>
}

export default CommentEditor