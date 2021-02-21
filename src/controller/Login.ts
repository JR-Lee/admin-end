import { Context, Next } from "koa"
import jwt from "jsonwebtoken"
import { authConfig } from '../config/index'
import db from "../db"

export default async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body

  if (!username || !password) throw(400)
  // 数据库搜索用户信息
  db

  const token = jwt.sign({ username }, authConfig.secret, { expiresIn: authConfig.expire })
  ctx.success({ token })
}
