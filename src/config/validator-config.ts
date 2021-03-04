import { RuleItem } from "async-validator"

export interface ParamType {
  [type: string]: {
    [prop: string]: RuleItem | RuleItem[];
  }
}

export interface ValidateConfig {
  [name: string]: ParamType;
}

const string = (name: string): RuleItem => {
  return { type: 'string', message: `参数 ${name} 应为 string` }
}

const required = (name: string): RuleItem => {
  return { required: true, message: `缺少参数 ${name}` }
}

const maxlength = (name: string, len: number): RuleItem => {
  return { max: len, message: `参数 ${name} 应小于 ${len} 个字符` }
}

const mail = (name: string = 'mail'): RuleItem => {
  return {
    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: `参数 ${name} 格式不正确`
  }
}

const password = (name: string = 'password'): RuleItem => {
  return {
    pattern: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: `参数 ${name} 应为 8 - 32 位包含大小写字母及数字的字符串`
  }
}

const timestamp = (name: string): RuleItem => {
  return {
    type: 'integer',
    message: `参数 ${ name } 应为有效时间戳`,
    transform: val => val ? Number(val) : val
  }
}

const bool = (name: string): RuleItem => {
  return {
    type: 'boolean',
    message: `参数 ${name} 应为布尔值`,
    transform: val => Boolean(val)
  }
}

const number = (name: string): RuleItem => {
  return {
    type: 'number',
    message: `参数 ${name} 应为数字`,
    transform: val => val ? Number(val) : val
  }
}

const validateConfig: ValidateConfig = {
  /** 用户登录 */
  login: {
    body: {
      username: required('username'),
      password: required('password')
    }
  },

  /** 用户注册 */
  register: {
    body: {
      username: [ required('username'), maxlength('username', 20) ],
      password: [ required('password'), password() ],
      mail: [ required('mail'), mail() ],
      code: required('code')
    }
  },

  /** 更改密码 */
  change: {
    body: {
      password: [ required('password'), password() ]
    }
  },


  /** 获取验证码 */
  asignCode: {
    body: {
      mail: [ required('mail'), mail()]
    }
  },

  /** 校验验证码 */
  verifyCode: {
    body: {
      mail: required('mail'),
      code: required('code')
    }
  },

  /** 获取文章 */
  getArticle: {
    query: {
      categoryId: string('categoryId'),
      startTime: timestamp('startTime'),
      endTime: timestamp('endTime'),
      hidden: number('hidden')
    }
  },

  /** 新增文章 */
  putArticle: {
    body: {
      title: [ string('title'), required('title'), maxlength('title', 100) ],
      content: [ required('content'), maxlength('content', 10000) ],
      categoryId: required('categoryId')
    },
  },

  /** 修改文章 */
  postArticle: {
    body: {
      title: [ required('title'), maxlength('title', 40) ],
      content: [ required('content'), maxlength('content', 10000) ]
    }
  },

  /** 新增分类 */
  putCategory: {
    body: {
      name: [ required('name'), maxlength('name', 20) ],
      remark: maxlength('remark', 200)
    }
  },

  /** 修改分类 */
  postCategory: {
    body: {
      name: maxlength('name', 20),
      remark: maxlength('remark', 200)
    }
  }
}

export default validateConfig
