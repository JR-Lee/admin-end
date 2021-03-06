import { model, Schema, SchemaDefinition } from "mongoose"
import schemaOptions from "../config/schema-options"

/**
 * username 用户名
 * password 密码
 * mail 邮箱
 * nickname 昵称
 * avatar 头像 uri
 * gender 性别 -- 0：男  1：女  2：未知
 * is_admin 是否管理员 -- 0：否  1：是
 * status 用户状态 -- 0：禁用  1：正常  2: 待审核
 */
const define: SchemaDefinition = {
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
  nickname: String,
  avatar: {
    type: String,
    default: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1316245513,2278546847&fm=26&gp=0.jpg'
  },
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
  phone: String,
  remark: String
}

const schema = new Schema(define, schemaOptions)

export default model('user', schema, 'user')
