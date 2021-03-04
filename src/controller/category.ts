import { AppContext } from "../types"
import { CategoryModel } from "../model"

export default class Category {
  static async get(ctx: AppContext) {
    const { _id } = ctx.params

    const res = _id ? (await CategoryModel.findById(_id)) : (await CategoryModel.find())

    ctx.success(res)
  }

  static async add(ctx: AppContext) {
    const { body } = ctx.request

    await CategoryModel.create(body)

    ctx.success()
  }

  static async update(ctx: AppContext) {
    const { _id } = ctx.params
    const { body } = ctx.request

    await CategoryModel.updateOne({ _id }, { ...body, updateTime: Date.now() })

    ctx.success()
  }

  static async delete(ctx: AppContext) {
    const { _id } = ctx.params

    await CategoryModel.deleteOne({ _id })

    ctx.success()
  }
}
