import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import router from './src/router'
import { serverConfig } from './src/config'
import { DefaultContext } from './src/types'
import { apiFormat } from './src/middleware'

const app = new Koa<{}, DefaultContext>()

app
  // 统一接口格式
  .use(apiFormat)
  // 错误捕获
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log(`${err.name === 'ApiError' ? 'Api 错误信息' : '服务器错误信息'}：${err.message}`)
    }
  })
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(serverConfig.port, () => {
    const { port, host } = serverConfig
    console.log(`服务已开启: ${host}:${port}`)
  })
