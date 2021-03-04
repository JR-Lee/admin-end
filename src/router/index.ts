import KoaRouter from 'koa-router'
import { Verify, User, Article, Category } from '../controller'
import { DefaultContext } from '../types'
import { validateParam } from '../middleware'

const router = new KoaRouter<{}, DefaultContext>()

router
  .prefix('/api')

  /** 获取验证码 */
  .post('/verify-code/asign', validateParam('asignCode'), Verify.asign)

  /** 校验验证码 */
  .post('/verify-code/verify', validateParam('verifyCode'), Verify.verify)

  /** 登录 */
  .post('/user/login', validateParam('login'), User.login)

  /** 注册 */
  .put('/user/register', validateParam('register'), User.register)

  /** 更改密码 */
  .post('/user/change-password', validateParam('change'), User.change)

  /** 获取文章 */
  .get(['/article', '/article/:_id'], validateParam('getArticle'), Article.get)

  /** 新增文章 */
  .put('/article', validateParam('putArticle'), Article.add)

  /** 编辑文章 */
  .post('/article/:_id', validateParam('postArticle'), Article.update)

  /** 删除文章 */
  .delete('/article/:_id', Article.delete)

  /** 获取分类 */
  .get('/category', Category.get)

  /** 新增分类 */
  .put('/category', validateParam('putCategory'), Category.add)

  /** 修改分类 */
  .post('/category/:_id', validateParam('postCategory'), Category.update)

  /** 删除分类 */
  .delete('/category/:_id', Category.delete)

export default router
