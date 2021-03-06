import { isBoolean } from "../utils"
import { ArticleModel } from "../model"
import { AppContext } from "../types"

class Article {
  static async get(ctx: AppContext) {
    const { _id } = ctx.params

    let res

    if (_id) res = await ArticleModel.findById(_id)
    else {
      const { categoryId, startTime = 0, endTime = Date.now(), hidden } = ctx.request.query

      const factor = []

      if (categoryId) factor.push({ categoryId })
      if (hidden) factor.push({ hidden })

      res = await ArticleModel.find({
        $and: [
          {
            $and: [
              { createTime: { $gt: startTime } },
              { createTime: { $lt: endTime } }
            ] 
          },
          ...factor
        ]
      })
    }

    ctx.success(res)
  }

  static async add(ctx: AppContext) {
    const { body } = ctx.request

    const { _id: authorId, name: authorName } = ctx.state

    await ArticleModel.create({ ...body, authorId, authorName })
    ctx.success()
  }

  static async update(ctx: AppContext) {
    const { _id } = ctx.params

    await ArticleModel.updateOne({ _id }, { ...ctx.request.body, updateTime: Date.now() })

    ctx.success()
  }

  static async delete(ctx: AppContext) {
    const { _id } = ctx.params

    await ArticleModel.deleteOne({ _id })

    ctx.success()
  }
}

export default Article
