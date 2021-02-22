import KoaRouter from 'koa-router'
import { Auth } from '../middleware/index'
import { Login, Register } from '../controller/index'
import Blog from '../controller/blog'
import { DefaultContext } from 'src/types'

const router = new KoaRouter<{}, DefaultContext>()

router
  .prefix('/api')
  // 身份验证中间件
  .use('/', Auth)
  // 登录
  .post('/login', Login)
  // 注册
  .put('/register', Register)
  // 博客
  .get('/blog', Blog.get)
  .put('/blog', Blog.update)
  .post('/blog', Blog.save)

export default router
