import { Context, Next } from "koa"
import ApiError from "../utils/api-error"

const apiFormat = async (ctx: Context, next: Next) => {
  ctx.success = (data: unknown = null, code: 200 | 201 = 200) => {
    ctx.body = { code, message: 'success', data }
  }

  ctx.error = (code: number, message?: string) => {
    if (!message) {
      switch (code) {
        case 400:
          message = '缺少参数'
          break
        case 401:
          message = 'token 无效'
          break
        case 403:
          message = '无访问权限'
          break
        case 404:
          message = '路径错误'
          break
        default:
          message = '未知错误'
          break
      }
    }
    ctx.body = { code, message, data: null }
    throw(new ApiError(code, message))
  }

  await next()
}

export default apiFormat
