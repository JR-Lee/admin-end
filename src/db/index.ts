import mongoose, { ConnectOptions } from 'mongoose'
import { logPretty } from '../utils'
import { dbConfig } from '../config'

const uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbname}`
const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export default async () => {
  try {
    logPretty.info('\n  正在尝试连接数据库...  \n')
    await mongoose.connect(uri, options)
    logPretty.success('  数据库连接正常  \n')
  } catch (err) {
    logPretty.error('数据库连接异常：' + err.message + '\n')
    process.exit()
  }
}
