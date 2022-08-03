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
import initEditor from "@components/Editor/init"

const PageNewPost: NextPage<Props> = ({
  secret,
  tags,
  categories,
  post: initalPost
}: Props) => {
  const router = useRouter()
  const [post, updatePost] = useState(initalPost)
  const [editor, setEditor] = useState<any>(null)

  useEffect(() => {

    (function (ClassicEditor) {
      if (ClassicEditor && !editor) {
        initEditor(ClassicEditor, {
          secret,
          element: document.querySelector('.editor')
        })
          .then((editor: any) => {
            setEditor(editor);

            if (post) {
              editor.setData(post.content)
            }
          })
          .catch((error: any) => {
            console.error('Oops, something went wrong!');
            console.error(error);
          });
      }
    })(
      // @ts-ignore
      ClassicEditor
    )
  }, [])

  const handleCreatePost = async ({ asDraft }: { asDraft: boolean } = { asDraft: false }) => {
    (async function name($: any) {
      let formData = $("form").serializeArray().reduce((result: { [key: string]: any }, el: { name: string, value: string }) => {
        result[el.name] = el.value
        return result
      }, {});

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

      let createTagResp: { success: boolean, data?: ITag[] }
      if (!asDraft) {
        createTagResp = await handleCreateTag(restTags)
      }
      else {
        createTagResp = {
          success: true,
          data: []
        }
      }
      if (createTagResp.success) {
        fetch("/api/v1/post", {
          "method": !post ? "POST" : "PUT",
          "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + secret
          },
          "body": JSON.stringify({
            "id": post?.id,
            "title": formData.title,
            "content": editor.getData(),
            "categories": formData.category !== "" ? [formData.category] : [],
            "tags": [...existTags, ...createTagResp.data.map((el: ITag) => el.id)],
            "asDraft": asDraft
          })
        })
          .then(async resp => {
            let json = await resp.json()
            if (resp.status === 200) {
              let data: IPost[] = json.data
              if (!post && !asDraft) {
                router.push("/p/" + data[0]?.slug)
              }
              else {
                let newPost: IPost = data[0];
                updatePost(newPost)
              }
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

  const handleSaveAsDraft = async () => {
    handleCreatePost({ asDraft: true })
  }

  return <>
    <Head>
      {!post && <title>let d4zum = new DevForum(Viêt bài mới)</title>}
      {post && <title>{post.title}</title>}
    </Head>
    <MobileMenu />
    <MainHeader />

    <main id="tt-pageContent">
      <div className="container">
        <div className="tt-wrapper-inner">
          <h1 className="tt-title-border">
            {post ? "Sửa bài viết" : "Viết bài mới"}
          </h1>
          <form className="form-default form-create-topic">
            <div className="form-group">
              <label htmlFor="inputTopicTitle">Tiêu đề</label>
              <div className="tt-value-wrapper">
                <input type="text" name="title" className="form-control" id="inputTopicTitle" placeholder="Tiêu đề bài viết..."
                  defaultValue={post?.title} />
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
                      {categories?.map?.(el => <option key={el.id} value={el.id} selected={el.id === post?.categories?.[0]?.id}>
                        {el.name}
                      </option>)}
                    </select>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <label htmlFor="inputTopicTags">Thẻ tags</label>
                    <input type="text" name="tags" className="form-control" id="inputTopicTags" placeholder="Sử dụng nhiều tags bởi dấu ,"
                      defaultValue={post?.tags?.map?.(el => el.name)?.join(",")} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-auto ml-md-auto">
                  <button type="button" className="btn btn-primary btn-width-lg me-2" onClick={() => handleSaveAsDraft()}>Lưu nháp</button>

                  {!post && <button type="button" className="btn btn-secondary btn-width-lg" onClick={() => handleCreatePost()}>Tạo mới</button>}
                  {post && <button type="button" className="btn btn-secondary btn-width-lg" onClick={() => handleCreatePost()}>Cập nhật</button>}
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

// secret,
//   tags,
//   categories

type Props = {
  secret?: string,
  tags?: ITag[],
  categories?: ICategory[]
  post?: IPost
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
      categories,
      secret: cookies["secret"],
    }
  };
}

export default PageNewPost
