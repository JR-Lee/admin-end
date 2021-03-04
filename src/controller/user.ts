import jwt from "jsonwebtoken"
import { UserModel } from '../model'
import { authConfig } from '../config/index'
import { AppContext } from "../types"
import { encrypt } from "../utils"
import VerifyCode from "../utils/verify-code"
import { Document } from "mongoose"

class User {
  static async login(ctx: AppContext) {
    const { username, password } = ctx.request.body

    // 邮箱及用户名都可登录
    const user = await UserModel.findOne({
      $or: [
        { username },
        { mail: username }
      ]
    })

    if (!user) ctx.error(404, '用户不存在')
    else {
      // 判断密码正确性
      const isRight = user.get('password') === encrypt(password)
      if (!isRight) {
        ctx.error(400, '密码错误')
        return
      }

      const payload = {
        id: user.get('_id'),
        name: user.get('username')
      }
      const token = jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.expire })

      ctx.success({ token })
    }
  }

  static async register(ctx: AppContext) {
    const { username, password, mail, code } = ctx.request.body
  
    // 用户是否已存在
    const isExist = await UserModel.findOne({ mail })
    if (isExist) ctx.error(403, '账号已存在')
  
    // 校验验证码
    const errorMessage = VerifyCode.verify(mail, code)
    if (errorMessage) ctx.error(400, errorMessage)
  
    const newPassword = encrypt(password) // 密码签名存储
    try {
      await UserModel.create({ username, mail, password: newPassword })
      ctx.success(null, 201)
    } catch (err) {
      const errArr = []
      for (const field in err.errors) errArr.push(err.errors[field].message)
      ctx.error(400, errArr.join(' | '))
    }
  }

  static async change(ctx: AppContext) {
    const { id: _id } = ctx.state
    const password = encrypt(ctx.request.body.password)

    const currentPassword = (await UserModel.findById(_id))?.get('password')

    if (password === currentPassword) ctx.error(400, '不能更改为与当前密码相同的密码')

    await UserModel.updateOne({ _id }, { password })
    ctx.success()
  }
}

export default User