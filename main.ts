import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import router from './src/router'
import { serverConfig } from './src/config'
import { DefaultContext, AppContext } from './src/types'

const app = new Koa<{}, DefaultContext>()

app
  /* 统一接口格式 */
  .use(async (ctx, next) => {
    ctx.success = (data: unknown, code: 200 | 201 = 200) => {
      ctx.body = { code, message: 'success', data }
    }

    ctx.error = (code: number, message?: string) => {
      if (!message) {
        switch (code) {
          case 400:
            message = '缺少参数'
            break
          case 401:
            message = '无效令牌'
            break
          case 403:
            message = '无访问权限'
            break
          case 404:
            message = '路径错误'
            break
          default:
            message = '未知错误'
        }
      }
      ctx.body = { code, message, data: null }
    }

    await next()
  })
  /**
   * 错误捕获
   * 遇到不正确的 api 请求，可以直接 throw(状态码) 的方式结束请求
   *    e.g. 缺少参数时，throw(400)
   * 需要自定义错误信息请使用 ctx.error(状态码, 错误信息)
   *    e.g. ctx.error(401, 'token 已过期')
   */
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log(`错误信息：${err}`)

      if (typeof err === 'number') ctx.error(err)
      else ctx.error(500)
    }
  })
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(serverConfig.port, () => {
    const { port, host } = serverConfig
    console.log(`服务已开启: ${host}:${port}`)
  })
