import { Next } from "koa"
import { AppContext } from "../types"
import Schema, { ValidateError, ValidateSource } from 'async-validator'
import validateConfig from "../config/validator-config"

export default (prop: string) => async function validate(ctx: AppContext, next: Next) {
  const paramsConfig = validateConfig[prop].params
  const bodyConfig = validateConfig[prop].body
  const queryConfig = validateConfig[prop].query

  if (paramsConfig) {
    const params = ctx.params as ValidateSource || {}

    const validator = new Schema(paramsConfig)

    try {
      await validator.validate(params)
    } catch (err) {
      ctx.error(400, err.errors.map((item: ValidateError) => item.message)[0])
    }
  }

  if (bodyConfig) {
    const body = ctx.request.body as ValidateSource

    const validator = new Schema(bodyConfig)

    try {
      await validator.validate(body)
    } catch (err) {
      ctx.error(400, err.errors.map((item: ValidateError) => item.message)[0])
    }
  }

  if (queryConfig) {
    const query = ctx.request.query as ValidateSource

    Object.setPrototypeOf(query, Object.prototype)

    const validator = new Schema(queryConfig)

    try {
      await validator.validate(new Object(query))
    } catch (err) {
      ctx.error(400, err.errors.map((item: ValidateError) => item.message)[0])
    }
  }

  await next()
}
