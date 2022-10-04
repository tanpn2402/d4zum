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
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import jwtDecode from "jwt-decode"

const PageNewPost: NextPage<Props> = ({
  secret,
  categories,
  isEditPage,
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
      handleSaveAsDraft({ content: data });
    }
  }

  const handleFetch = async ({ asDraft, content }: { asDraft: boolean, content?: string } = { asDraft: false }) => {
    return new Promise<IPost>(async resolve => {
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
      const post = postRef.current

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
            let data: IPost = json.data
            resolve(data)
          }
          else {
            throw json.error
          }
        })
        .catch(error => {
          console.error(error)
          setMessage("Lưu thành lỗi rồi, thử lại xíu đi!")
          resolve(null)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  const handleCreatePost = async () => {
    let post = await handleFetch()
    if (post) {
      if (!post.publishedAt) {
        fetch("/api/v1/post/publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            slug: post?.slug
          })
        })
          .then(async resp => {
            let json: {
              error: any
              data: IPost
            } = await resp.json();
            if (resp.status === 200) {
              router.push("/p/" + json?.data?.slug)
            }
            else {
              throw json.error
            }
          })
          .catch(error => {
            console.error(error)
            setMessage("Lưu thành lỗi rồi, thử lại xíu đi!")
          })
      }
      else {
        router.push("/p/" + post?.slug)
      }
    }
  }

  const handleSaveAsDraft = async ({ content }: { content?: string }) => {
    let post = await handleFetch({ asDraft: true, content })
    updatePost(post)
    setMessage("Lưu thành công nhé!")
  }

  const handleUpdatePost = async () => {
    let post = await handleFetch()
    updatePost(post)
    setMessage("Lưu thành công nhé!")
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
            </div>
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
                  {isEditPage && <>
                    <button type="button" disabled={isLoading} className="btn btn-primary btn-width-lg" onClick={() => handleUpdatePost()}>Cập nhật</button>
                  </>}

                  {!isEditPage && <>
                    <button type="button" className="btn btn-primary btn-width-lg" onClick={() => handleSaveAsDraft({})}>Lưu nháp</button>
                  </>}

                  <button type="button" disabled={isLoading} className="btn btn-secondary btn-width-lg ms-2" onClick={() => handleCreatePost()}>Đăng bài</button>
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
  isEditPage?: boolean
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let cookies = getCookies({ req: context.req, res: context.res })
  let jwtData: IJwtAuthenticateData = jwtDecode(cookies["jwt"].toString())
  if (!cookies["jwt"]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const [categories, tags] = await Promise.all([
    getCategories({
      postGroupIds: jwtData?.groups?.map?.(group => group.id)
    }),
    getTags({})
  ])

  return {
    props: {
      tags,
      categories,
      secret: cookies["secret"],
    }
  };
}

export default PageNewPost
