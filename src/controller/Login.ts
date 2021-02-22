import jwt from "jsonwebtoken"
import User from '../model/User'
import { authConfig } from '../config/index'
import { AppContext } from "../types"
import { encrypt } from "../utils"

export interface LoginParam {
  username: string;
  password: string;
}

export default async (ctx: AppContext) => {
  const { username, password } = ctx.request.body

  if (!username || !password) throw(400)
  else {
    // 邮箱及用户名都可登录
    const user = await User.findOne({ $or: [{ mail: username }, { username }] })

    if (!user) ctx.error(401, '用户不存在')
    else {
      // 判断密码正确性
      const isRight = user.get('password') === encrypt(password)
      if (!isRight) {
        ctx.error(401, '密码错误')
        return
      }
      
      const token = jwt.sign({ userId: user._id }, authConfig.secret, { expiresIn: authConfig.expire })
      ctx.success({ token })
    }
  }
}
