import { Context, Next } from "koa"
import jwt from 'jsonwebtoken'
import { authConfig } from '../config/index'

// 白名单
const whites: RegExp = /^\/api\/login$|^\/api\/register$/

export default async (ctx: Context, next: Next) => {
  if (whites.test(ctx.path)) await next()
  else {
    const token = ctx.get('token')

    if (!token) throw(401)

    try {
      const { username } = jwt.verify(token, authConfig.secret)as { username: '' }
      console.log(username)
      await next()
    } catch (err) {
      const message = err.message === 'jwt expired' ? 'token 已过期' : ''
      ctx.error(401, message)
    }
  }
}