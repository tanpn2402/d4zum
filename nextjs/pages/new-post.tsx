import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SvgSprite from "@components/SvgSprite"
import ICategory from "@interfaces/ICategory"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import { get as getCategories } from "@services/graphql/api/Category.api"
import { getCookies } from "cookies-next"
import type { GetServerSideProps, NextPage } from 'next'
import Head from "next/head"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"
import { get as getTags } from "@services/graphql/api/Tag.api"
import ITag from "@interfaces/ITag"
import { useRouter } from "next/router"
import IPost from "@interfaces/IPost"

const PageNewPost: NextPage = ({
  token,
  secret,
  tags,
  jwtData,
  categories
}: Props) => {
  const router = useRouter()
  const [editor, setEditor] = useState<any>(null)

  useEffect(() => {

    (function (ClassicEditor) {

      class MyUploadAdapter {
        private loader: any
        private xhr: any

        constructor(loader: any) {
          // The file loader instance to use during the upload.
          this.loader = loader;
        }

        // Starts the upload process.
        upload() {
          return this.loader.file
            .then((file: any) => new Promise((resolve, reject) => {
              this._initRequest();
              this._initListeners(resolve, reject, file);
              this._sendRequest(file);
            }));
        }

        // Aborts the upload process.
        abort() {
          if (this.xhr) {
            this.xhr.abort();
          }
        }

        // Initializes the XMLHttpRequest object using the URL passed to the constructor.
        _initRequest() {
          const xhr = this.xhr = new XMLHttpRequest();

          // Note that your request may look different. It is up to you and your editor
          // integration to choose the right communication channel. This example uses
          // a POST request with JSON as a data structure but your configuration
          // could be different.
          xhr.open('POST', 'http://example.com/image/upload/path', true);
          xhr.responseType = 'json';
        }

        // Initializes XMLHttpRequest listeners.
        _initListeners(resolve, reject, file) {
          const xhr = this.xhr;
          const loader = this.loader;
          const genericErrorText = `Couldn't upload file: ${file.name}.`;

          xhr.addEventListener('error', () => reject(genericErrorText));
          xhr.addEventListener('abort', () => reject());
          xhr.addEventListener('load', () => {
            const response = xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.
            if (!response || response.error) {
              return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve({
              default: response.url
            });
          });

          // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
          // properties which are used e.g. to display the upload progress bar in the editor
          // user interface.
          if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
              if (evt.lengthComputable) {
                loader.uploadTotal = evt.total;
                loader.uploaded = evt.loaded;
              }
            });
          }
        }

        // Prepares the data and sends the request.
        _sendRequest(file) {
          // Prepare the form data.
          const data = new FormData();

          data.append('upload', file);

          // Important note: This is the right place to implement security mechanisms
          // like authentication and CSRF protection. For instance, you can use
          // XMLHttpRequest.setRequestHeader() to set the request headers containing
          // the CSRF token generated earlier by your application.

          // Send the request.
          this.xhr.send(data);
        }
      }

      function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
          // Configure the URL to the upload script in your back-end here!
          return new MyUploadAdapter(loader);
        };
      }
      if (ClassicEditor && !editor) {
        ClassicEditor
          .create(document.querySelector('.editor'), {
            extraPlugins: [MyCustomUploadAdapterPlugin],
            licenseKey: '',
            heading: {
              options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
              ]
            },
            toolbar: [
              'paragraph',
              'heading1',
              'heading2',
              '|',
              'bold',
              'italic',
              'underline',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'codeBlock',
              'highlight',
              // 'imageUpload',
              'imageInsert',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ],
            language: 'vi'

          })
          .then((editor: any) => {
            setEditor(editor);

          })
          .catch((error: any) => {
            console.error('Oops, something went wrong!');
            console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
            console.warn('Build id: useeleshi2dm-2pas1t5k16pa');
            console.error(error);
          });
      }
    })(
      // @ts-ignore
      ClassicEditor
    )
  }, [])

  const handleCreatePost = async () => {
    (async function name($: any) {
      let formData = $("form").serializeArray().reduce((result: { [key: string]: any }, el: { name: string, value: string }) => {
        result[el.name] = el.value
        return result
      }, {});

      console.log(formData);

      let restTags: string[] = [],
        existTags = formData.tags?.split(",")?.reduce?.((result: string[], el: string) => {
          let t = tags.filter(tag => tag.name.toLowerCase() === el.toLowerCase())[0];
          if (t) {
            result.push(t.id)
          }
          else {
            restTags.push(el)
          }
          return result
        }, [])

      let createTagResp = await handleCreateTag(restTags)
      if (createTagResp.success) {
        fetch("/api/v1/post", {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + secret
          },
          "body": JSON.stringify({
            "title": formData.title,
            "content": editor.getData(),
            "categories": formData.category !== "" ? [formData.category] : [],
            "tags": [...existTags, ...createTagResp.data.map(el => el.id)]
          })
        })
          .then(async resp => {
            let json = await resp.json()
            if (resp.status === 200) {
              let data: IPost[] = json.data
              console.log(data);
              router.push("/p/" + data[0]?.slug)
            }
            else {
              throw json.error
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    })(
      // @ts-ignore
      $
    )
  }

  const handleCreateTag = async (tags: string[]): Promise<{ success: boolean, data?: ITag[] }> => {
    return new Promise(resolve => {
      fetch("/api/v1/post/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          names: tags
        })
      })
        .then(async resp => {
          let json = await resp.json();
          if (resp.status === 200) {
            resolve({ success: true, data: json.data })
          }
          else {
            throw json.error
          }
        })
        .catch(error => {
          console.log(error)
          resolve({ success: false })
        })
    })
  }

  return <>
    <Head>
      <title>let d4zum = new DevForum(Viêt bài mới)</title>
    </Head>
    <MobileMenu />
    <MainHeader />
    <main id="tt-pageContent">
      <div className="container">
        <div className="tt-wrapper-inner">
          <h1 className="tt-title-border">
            Viết bài mới
          </h1>
          <form className="form-default form-create-topic">
            <div className="form-group">
              <label htmlFor="inputTopicTitle">Tiêu đề</label>
              <div className="tt-value-wrapper">
                <input type="text" name="title" className="form-control" id="inputTopicTitle" placeholder="Tiêu đề bài viết..." />
                <span className="tt-value-input">99</span>
              </div>
              {/* <div className="tt-note">Describe your topic well, while keeping the subject as short as possible.</div> */}
            </div>
            {/* <div className="form-group">
              <label>Topic Type</label>
              <div className="tt-js-active-btn tt-wrapper-btnicon">
                <div className="row tt-w410-col-02">
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <svg>
                          <use xlinkHref="#icon-discussion" />
                        </svg>
                      </span>
                      <span className="tt-text">Discussion</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <svg>
                          <use xlinkHref="#Question" />
                        </svg>
                      </span>
                      <span className="tt-text">Question</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <svg>
                          <use xlinkHref="#Poll" />
                        </svg>
                      </span>
                      <span className="tt-text">Poll</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <svg>
                          <use xlinkHref="#icon-gallery" />
                        </svg>
                      </span>
                      <span className="tt-text">Gallery</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <svg>
                          <use xlinkHref="#Video" />
                        </svg>
                      </span>
                      <span className="tt-text">Video</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <svg>
                          <use xlinkHref="#Others" />
                        </svg>
                      </span>
                      <span className="tt-text">Other</span>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="pt-editor">
              <h6 className="pt-title">Nội dung</h6>
              <div className="mb-4 p-0 tt-single-topic">
                <div className="tt-item-description">
                  <div className="editor"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="inputTopicTitle">Chủ đề</label>
                    <select className="form-control" name="category">
                      <option value="">---</option>
                      {categories?.map?.(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <label htmlFor="inputTopicTags">Thẻ tags</label>
                    <input type="text" name="tags" className="form-control" id="inputTopicTags" placeholder="Sử dụng nhiều tags bởi dấu ," />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-auto ml-md-auto">
                  <button type="button" className="btn btn-secondary btn-width-lg" onClick={() => handleCreatePost()}>Tạo mới</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>

    <SvgSprite />
  </>
}

type Props = {
  token?: string,
  secret?: string,
  tags?: ITag[],
  categories?: ICategory[],
  jwtData?: IJwtAuthenticateData
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let cookies = getCookies({
    req: context.req,
    res: context.res,
  })

  if (!cookies["jwt"]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const [categories, tags] = await Promise.all([
    getCategories({}),
    getTags({})
  ])

  let jwtData: IJwtAuthenticateData = jwtDecode(cookies["jwt"].toString())

  return {
    props: {
      tags,
      jwtData,
      categories,
      token: cookies["token"],
      secret: cookies["secret"],
    }
  };
}

export default PageNewPost
