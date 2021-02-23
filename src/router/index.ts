import KoaRouter from 'koa-router'
import { auth } from '../middleware/index'
import { Verify, User } from '../controller/index'
import Blog from '../controller/blog'
import { DefaultContext } from 'src/types'

const router = new KoaRouter<{}, DefaultContext>()

router
  .prefix('/api')
  // 身份验证中间件
  .use('/', auth)
  // 验证码
  .post('/verify-code/asign', Verify.asign)
  .post('/verify-code/verify', Verify.verify)
  // 登录
  .post('/user/login', User.login)
  // 注册
  .put('/user/register', User.register)
  // 博客
  .get('/blog', Blog.get)
  .put('/blog', Blog.update)
  .post('/blog', Blog.save)

export default router
