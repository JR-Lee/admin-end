import ArticleModel from "../model/article"
import { AppContext } from "src/types"

class Article {
  static async get(ctx: AppContext) {
    const res = await ArticleModel.find()
    ctx.success(res)
  }

  static async add(ctx: AppContext) {
    const { content, title, categoryId } = ctx.request.body

    if (!content || !title || !categoryId) ctx.error(400)
    else {
      const { id: authorId, name: authorName } = ctx.state
      const data = { authorId, authorName, content, title }
      await ArticleModel.create(data)
      ctx.success()
    }
  }

  static update() {
    return true
  }
}

export default Article