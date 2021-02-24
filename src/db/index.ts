import mongoose from 'mongoose'
import { dbConfig } from '../config'

const uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbname}`

export default async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('数据库连接正常')
  } catch (err) {
    throw('数据库连接异常：' + err.message)
  }
}
