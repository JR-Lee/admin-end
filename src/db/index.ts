import mongoose from 'mongoose'
import { dbConfig } from '../config'

const uri = `mongodb://${dbConfig.host}:${dbConfig.port}`

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log('数据库连接失败：' + err.message))

const db = mongoose.connection

export default db