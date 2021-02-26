import { RuleItem } from "async-validator"

export interface TypeI {
  [type: string]: {
    [prop: string]: RuleItem | RuleItem[];
  }
}

export interface ValidateConfig {
  [path: string]: {
    [method: string]: TypeI;
  }
}

const articleConfig: TypeI = {
  body: {
    title: [
      { type: 'string', required: true, message: '缺少参数 title' },
      { max: 20, message: '参数 title 应小于 20 个字数' }
    ],
    content: [
      { type: 'string', required: true, message: '缺少参数 content' },
      { max: 10000, message: '参数 content 应小于 10000 个字数' }
    ],
    categoryId: [
      { type: 'string', required: true, message: '缺少参数 categoryId' }
    ]
  }
}

const validateConfig: ValidateConfig = {
  /** 新增（put）、编辑文章（post） */
  '/api/article': {
    put: {
      body: {
        title: [
          { required: true, message: '缺少参数 title' },
          { max: 20, message: '参数 title 应小于 20 个字数' }
        ],
        content: [
          { required: true, message: '缺少参数 content' },
          { max: 10000, message: '参数 content 应小于 10000 个字数' }
        ],
        categoryId: [
          { required: true, message: '缺少参数 categoryId' }
        ]
      }
    },
    post: {
      body: {
        title: [
          { max: 20, message: '参数 title 应小于 20 个字数' }
        ],
        content: [
          { max: 10000, message: '参数 content 应小于 10000 个字数' }
        ]
      }
    }
  },

  /** 用户登录 */
  '/api/user/login': {
    post: {
      body: {
        username: { required: true, message: '缺少参数 username' },
        password: { required: true, message: '缺少参数 password' }
      }
    }
  },

  /** 用户注册 */
  '/api/user/register': {
    put: {
      body: {
        username: [
          { required: true, message: '缺少参数 username' },
          { max: 20, message: '参数 username 应小于 20 个字数' }
        ],
        password: [
          { required: true, message: '缺少参数 password' },
          {
            pattern: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
            message: '参数 password 应为 8 - 32 位包含大小写字母及数字的字符串'
          }
        ],
        mail: [
          { required: true, message: '缺少参数 mail' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '参数 mail 格式不正确'
          }
        ],
        code: { required: true, message: '缺少参数 code' }
      }
    }
  },
  '/api/verify-code/asign': {
    post: {
      body: {
        mail: [
          { required: true, message: '缺少参数 mail' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '参数 mail 格式不正确'
          }
        ]
      }
    }
  },
  '/api/verify-code/verify': {
    post: {
      body: {
        mail: { required: true, message: '缺少参数 mail' },
        code: { required: true, message: '缺少参数 code' }
      }
    }
  }
}

export default validateConfig
