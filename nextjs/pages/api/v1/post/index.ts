// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { create, get, update } from "@services/graphql/api/Post.api"
import { get as getTags, create as createTags } from "@services/graphql/api/Tag.api"
import IPost from "@interfaces/IPost"
import ITag from "@interfaces/ITag"
import BaseApiRouting from "@lib/http/BaseApiRouting"
import BaseApiHandler from "@lib/http/BaseApiHandler"
import WsEvent from "enums/WsEvent"
import PublicationState from "enums/PublicationState"


class PostApiHandler extends BaseApiHandler<IPost> {

  private async saveTags(tags: string[]): Promise<ITag[]> {
    let result: ITag[] = []
    if (tags?.length) {
      const existedTags: ITag[] = await getTags({ name: tags.map(e => e.trim()) })
      let restTags: string[] = []

      tags.forEach(tag => {
        let t = existedTags.filter(el => el.name.trim().toLowerCase() === tag.trim().toLowerCase())
        if (t.length === 0) {
          restTags.push(tag)
        }
        else {
          result = result.concat(t)
        }
      })

      if (restTags.length > 0) {
        let t = await createTags({ names: restTags })
        if (t) {
          result = result.concat(t)
        }
      }
    }

    if (result.length > 0) {
      result = result.reduce((rlt: ITag[], tag) => {
        if (rlt.filter(el => el.name.trim().toLowerCase() === tag.name.trim().toLowerCase()).length === 0) {
          rlt.push(tag)
        }
        return rlt
      }, [])
    }

    return result
  }

  public async post(): Promise<number | IPost> {
    const body = this.req.body as {
      tags: string[]
      categories: string[]
      asDraft: boolean
    } & IPost
    const tags = await this.saveTags(body.tags)

    let resp = await create({
      content: body.content,
      title: body.title,
      userId: this.req.jwt.id,
      categories: body.categories,
      tags: tags.map(e => e.id),
      asDraft: body.asDraft
    })

    return resp
  }

  public async put(): Promise<number | IPost> {
    const body = this.req.body as {
      tags: string[]
      categories: string[]
    } & IPost
    const tags = await this.saveTags(body.tags)

    if (body.id) {
      let posts = await get({
        id: body.id,
        state: PublicationState.PREVIEW,
        groupIds: this.req.jwt.groups?.map?.(group => group.id)
      })
      if (posts?.length === 0) {
        posts = await get({
          id: body.id,
          state: PublicationState.LIVE,
          groupIds: this.req.jwt.groups?.map?.(group => group.id)
        })
      }

      if (posts?.length === 0) {
        return 404
      }
      else if (posts[0].user?.id !== this.req.jwt?.id) {
        return 403
      }
      else {
        let resp = await update({
          id: body.id,
          content: body.content,
          title: body.title,
          userId: this.req.jwt.id,
          categories: body.categories,
          tags: tags.map(e => e.id),
        })

        return resp
      }
    }
    else {
      return 404
    }
  }

  public sendNotification(event: WsEvent, value?: IPost): void {

  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default (new BaseApiRouting(PostApiHandler))
  .withJwt()
  .getHandler()