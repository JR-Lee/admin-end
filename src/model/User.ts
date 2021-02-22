import { Document, Schema } from "mongoose"
import db from "../db"

/**
 * username 用户名
 * password 密码
 * mail 邮箱
 * avatar 头像 uri
 * gender 性别 -- 0：男  1：女  2：未知
 * is_admin 是否管理员 -- 0：否  1：是
 * status 用户状态 -- 0：禁用  1：正常  2: 待审核
 */
const schema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: [20, '用户名长度应小于 20']
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    validate: {
      validator(value: string) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
      },
      message: '参数 mail 格式错误'
    }
  },
  avatar: String,
  gender: {
    type: Number,
    default: 2,
    validate: {
      validator(value: number) {
        return typeof value === 'number' && /0|1|2/.test(value + '')
      },
      message: '参数 gender 格式错误'
    }
  },
  isAdmin: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 2
  },
  createTime: { type: Number, default: Date.now() },
  updateTime: { type: Number, default: Date.now() }
}, {
  collection: 'user',
  versionKey: false
})

const User = db.model('user', schema)

export default User
