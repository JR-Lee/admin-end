import { Next } from "koa"
import { AppContext } from "../types"
import Schema, { ValidateError, ValidateSource } from 'async-validator'
import validateConfig from "../config/validator-config"

export default async (ctx: AppContext, next: Next) =>{
  const { path, method } = ctx

  const bodyConfig = ((validateConfig[path] || {})[method.toLowerCase()] || {})['body']

  if (bodyConfig) {
    const body = ctx.request.body as ValidateSource

    const validator = new Schema(bodyConfig)

    try {
      await validator.validate(body)
    } catch (err) {
      ctx.error(400, err.errors.map((item: ValidateError) => item.message)[0])
    }
  }

  await next()
}
