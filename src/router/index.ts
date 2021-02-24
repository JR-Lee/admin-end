import KoaRouter from 'koa-router'
import { Verify, User } from '../controller/index'
import Article from '../controller/article'
import { DefaultContext } from 'src/types'

const router = new KoaRouter<{}, DefaultContext>()

router
  .prefix('/api')
  // 验证码
  .post('/verify-code/asign', Verify.asign)
  .post('/verify-code/verify', Verify.verify)
  // 登录
  .post('/user/login', User.login)
  // 注册
  .put('/user/register', User.register)
  // 博客
  .get('/article', Article.get)
  .put('/article', Article.add)
  .post('/article', Article.update)

export default router
