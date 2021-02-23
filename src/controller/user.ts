import jwt from "jsonwebtoken"
import UserModel from '../model/user'
import { authConfig } from '../config/index'
import { AppContext } from "../types"
import { encrypt } from "../utils"
import VerifyCode from "../utils/verify-code"

class User {
  static async login(ctx: AppContext) {
    const { username, password } = ctx.request.body
  
    if (!username || !password) ctx.error(400)
    else {
      // 邮箱及用户名都可登录
      const user = await UserModel.findOne({ $or: [{ mail: username }, { username }] })
  
      if (!user) ctx.error(404, '用户不存在')
      else {
        // 判断密码正确性
        const isRight = user.get('password') === encrypt(password)
        if (!isRight) {
          ctx.error(400, '密码错误')
          return
        }
        
        const token = jwt.sign({ userId: user._id }, authConfig.secret, { expiresIn: authConfig.expire })
        ctx.success({ token })
      }
    }
  }

  static async register(ctx: AppContext) {
    const { username, password, mail, code } = ctx.request.body
  
    if (!username || !password || !mail || !code) ctx.error(400)
  
    // 用户是否已存在
    const isExist = await UserModel.findOne({ mail })
    if (isExist) ctx.error(403, '账号已存在')
  
    // 校验验证码
    const errorMessage = VerifyCode.verify(mail, code)
    if (errorMessage) ctx.error(400, errorMessage)
  
    const newPassword = encrypt(password) // 密码签名存储
    try {
      const res = await UserModel.create({ username, mail, password: newPassword })
      ctx.success(null, 201)
    } catch (err) {
      const errArr = []
      for (const field in err.errors) errArr.push(err.errors[field].message)
      ctx.error(400, errArr.join(' | '))
    }
  }
}

export default User