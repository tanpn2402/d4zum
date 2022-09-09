import MainHeader from "@components/MainHeader"
import MobileMenu from "@components/MainHeader/mobile-menu"
import SvgSprite from "@components/SvgSprite"
import ICategory from "@interfaces/ICategory"
import { get as getCategories } from "@services/graphql/api/Category.api"
import { getCookies } from "cookies-next"
import type { GetServerSideProps, NextPage } from 'next'
import Head from "next/head"
import { useEffect, useState } from "react"
import { get as getTags } from "@services/graphql/api/Tag.api"
import ITag from "@interfaces/ITag"
import { useRouter } from "next/router"
import IPost from "@interfaces/IPost"
import initEditor from "@components/Editor/init"
import useStateRef from "@hooks/useStateRef"

const PageNewPost: NextPage<Props> = ({
  secret,
  categories,
  post: initalPost
}: Props) => {

  const router = useRouter()
  const [message, setMessage] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [post, updatePost, postRef] = useStateRef<IPost>(initalPost)
  const [editor, setEditor] = useState<any>(null)

  useEffect(() => {
    // init Editor
    // @ts-ignore
    const classicEditor = ClassicEditor
    if (classicEditor && !editor) {
      initEditor(classicEditor, {
        secret,
        element: document.querySelector('.editor'),
        autoSaveTimer: 5000,
        onAutoSave: handleAutoSave
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
  }, [])

  const handleAutoSave = (data: string) => {
    if (data?.trim?.() !== '') {
      console.log(post);
      handleSaveAsDraft({ content: data });
    }
  }

  const handleCreatePost = async ({
    asDraft,
    content
  }: { asDraft: boolean, content?: string } = { asDraft: false }) => {

    if (isLoading) {
      return
    }

    let formData = await (async function name($: any) {
      return $("form").serializeArray().reduce((result: { [key: string]: any }, el: { name: string, value: string }) => {
        result[el.name] = el.value
        return result
      }, {});
    })(
      // @ts-ignore
      $
    )
    setLoading(true)
    setMessage(null)
    const post = postRef.current;

    fetch("/api/v1/post", {
      "method": !post ? "POST" : "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + secret
      },
      "body": JSON.stringify({
        "id": post?.id,
        "title": formData.title,
        "content": content || editor.getData(),
        "categories": formData.category !== "" ? [formData.category] : [],
        "tags": formData.tags?.split(","),
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
            let newPost: IPost = data[0]
            updatePost(newPost)
            setMessage("Lưu thành công nhé!")
          }
        }
        else {
          throw json.error
        }
      })
      .catch(error => {
        console.log(error)
        setMessage("Lưu thành lỗi rồi, thử lại xíu đi!")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSaveAsDraft = ({ content }: { content?: string }) => {
    handleCreatePost({ asDraft: true, content })
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }, [message])

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
                    <select className="form-control" name="category" defaultValue={post?.categories?.[0]?.id}>
                      <option value="">---</option>
                      {categories?.map?.(el => <option key={el.id} value={el.id}>
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
                  <button type="button" className="btn btn-primary btn-width-lg me-2" onClick={() => handleSaveAsDraft({})}>Lưu nháp</button>

                  {!post && <button type="button" disabled={isLoading} className="btn btn-secondary btn-width-lg" onClick={() => handleCreatePost()}>Tạo mới</button>}
                  {post && <button type="button" disabled={isLoading} className="btn btn-secondary btn-width-lg" onClick={() => handleCreatePost()}>Cập nhật</button>}
                  {isLoading && <span className="ms-4"><img width="40" src="/images/svg/disk-spin.svg" /></span>}
                  {message && <span className="ms-4">{message}</span>}
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

  console.log(tags);

  return {
    props: {
      tags,
      categories,
      secret: cookies["secret"],
    }
  };
}

export default PageNewPost
