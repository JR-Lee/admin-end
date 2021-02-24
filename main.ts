import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import router from './src/router'
import { serverConfig } from './src/config'
import { DefaultContext } from './src/types'
import { apiFormat, auth } from './src/middleware'
import DBconnect from './src/db'
import { mailVerify } from './src/utils/send-mail'

(async () => {
  // 连接数据库
  await DBconnect()
  // 邮件服务器连通性检测
  await mailVerify()

  new Koa<{}, DefaultContext>()
    // 统一接口格式
    .use(apiFormat)
    // 身份验证中间件
    .use(auth)
    // 错误捕获
    .use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        console.log(`${err.name === 'ApiError' ? 'Api 错误信息' : '服务器错误信息'}：${err}`)
      }
    })
    // body 解析
    .use(bodyparser())
    // 路由
    .use(router.routes())
    .use(router.allowedMethods())
    // 开启服务
    .listen(serverConfig.port, () => {
      const { port, host } = serverConfig
      console.log(`服务已开启: http://${host}:${port}`)
    })
})()
