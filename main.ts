import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import serve from 'koa-static'
import { serverConfig } from './src/config'
import { DefaultContext } from './src/types'
import { apiFormat, auth } from './src/middleware'
import { mailVerify } from './src/utils/send-mail'
import { logPretty } from './src/utils'
import router from './src/router'
import DBconnect from './src/db'

;(async () => {
  /** 连接数据库 */
  await DBconnect()

  /** 邮件服务器连通性检测 */
  await mailVerify()

  new Koa<{}, DefaultContext>()
    /** 统一接口格式 */
    .use(apiFormat)

    /** 错误捕获 */
    .use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        let message = err.message

        switch (err.name) {
          case 'ApiError':
            logPretty.warning('  Api 错误信息：' + message + '\n')
            break
          case 'CastError':
            logPretty.warning('  mongoose 查询错误：' + message + '\n')
            ctx.body = { code: 400, message: '参数错误', data: null }
            break
          default:
            logPretty.error('未知错误：' + message + '\n')
            ctx.body = { code: 0, message: '未知错误', data: null }
            break
        }
      }
    })

    /** 静态文件 */
    .use(serve('./public'))

    /** 身份验证 */
    .use(auth)

    /** body 解析 */
    .use(bodyparser())

    /** 路由 */
    .use(router.routes())
    .use(router.allowedMethods())

    /** 开启服务 */
    .listen(serverConfig.port, () => {
      const { port, host } = serverConfig
      logPretty.success(`  服务已开启: http://${host}:${port}  \n`)
    })
})()
