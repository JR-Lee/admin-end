import { Next } from "koa"
import { AppContext } from "../types"
import VerifyCode from "../utils/verify-code"

export default class Verify {
  static async asign(ctx: AppContext, next: Next) {
    const { mail } = ctx.request.body

    await VerifyCode.asign(mail)
    ctx.success()
  }

  static verify(ctx: AppContext, next: Next) {
    const { mail, code } = ctx.request.body

    const errorMessage = VerifyCode.verify(mail, code)
    if (errorMessage) ctx.error(400, errorMessage)
    else ctx.success()
  }
}