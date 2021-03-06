import multer from '@koa/multer'
import { Next } from 'koa'
import path from 'path'
import { serverConfig } from '../config'
import { AppContext } from '../types'

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, path.join(__dirname, '../../public')),
  filename: (req, file, callback) => {
    const type = file.originalname.split('.')[1]
    callback(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})

const limits: multer.Options["limits"] = {
  fields: 10,
  fileSize: 1024 * 1024 * 10,
  files: 1
}

export default class Upload {
  static instance = multer({
    storage: storage,
    limits: limits
  })

  /** 上传头像 */
  static async fallback(ctx: AppContext, next: Next) {
    ctx.success(`//${serverConfig.host}:${serverConfig.port}/` + ctx.file.filename)
  }
}
