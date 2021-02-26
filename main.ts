import Koa, { Context, Next } from 'koa'
import bodyparser from 'koa-bodyparser'
import { serverConfig } from './src/config'
import { DefaultContext } from './src/types'
import { apiFormat, auth, validateParam } from './src/middleware'
import { mailVerify } from './src/utils/send-mail'
import { logPretty } from './src/utils'
import router from './src/router'
import DBconnect from './src/db'

(async () => {
  /** 连接数据库 */
  await DBconnect()

  /** 邮件服务器连通性检测 */
  // await mailVerify()

  new Koa<{}, DefaultContext>()
    /** 统一接口格式 */
    .use(apiFormat)

    /** 错误捕获 */
    .use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        if (err.name === 'ApiError') logPretty.warning('  Api 错误信息：' + err.message + '\n')
        else logPretty.error('服务器错误信息：' + err)
      }
    })

    /** 身份验证 */
    .use(auth)

    /** body 解析 */
    .use(bodyparser())

    /** 参数校验 */
    .use(validateParam)

    /** 路由 */
    .use(router.routes())
    .use(router.allowedMethods())

    /** 开启服务 */
    .listen(serverConfig.port, () => {
      const { port, host } = serverConfig
      logPretty.success(`  服务已开启: http://${host}:${port}  \n`)
    })
})()
