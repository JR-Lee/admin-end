import { Context, Next } from "koa"
import jwt from 'jsonwebtoken'
import { authConfig } from '../config/index'

// 白名单
const list = [
  '/user/login',
  '/user/register',
  '/verify-code/asign',
  '/verify-code/verify'
].map(item => '^/api' + item + '$')

const whites: RegExp = new RegExp(list.join('|'))

export default async (ctx: Context, next: Next) => {
  const { path } = ctx

  if (!whites.test(path)) {
    const token = ctx.get('token')

    if (!token) ctx.error(401)

    try {
      const { _id, name } = jwt.verify(token, authConfig.secret) as { _id: string, name: string }
      ctx.state._id = _id
      ctx.state.name = name
    } catch (err) {
      const message = err.message === 'jwt expired' ? 'token 已过期' : 'token 无效'
      ctx.error(401, message)
    }
  }

  await next()
}
