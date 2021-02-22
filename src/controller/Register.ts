import { Next } from "koa"
import { AppContext } from "../types"
import User from "../model/User"
import { encrypt } from "../utils"

export interface RegisterParam {
  username: string;
  password: string;
  mail: string;
  avatar?: string;
  gender?: number;
}

export default async (ctx: AppContext, next: Next) => {
  const { username, password, mail } = ctx.request.body

  if (!username || !password || !mail) throw(400)

  // 用户是否已存在
  const isExist = await User.findOne({ mail })
  if (isExist) ctx.error(403, '用户已存在')
  else {
    // 密码签名存储
    const newPassword = encrypt(password)
    try {
      const res = await User.create({ username, mail, password: newPassword })
      ctx.success(res, 201)
    } catch (err) {
      const errArr = []
      for (const field in err.errors) errArr.push(err.errors[field].message)
      ctx.error(400, errArr.join(' | '))
    }
  }
}
