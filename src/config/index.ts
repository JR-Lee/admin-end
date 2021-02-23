import fs from 'fs'

export const serverConfig = {
  port: '3030',
  host: '127.0.0.1'
}

export const mailConfig = {
  host: 'smtp.163.com',
  port: 465,
  user: '15099802136@163.com',
  pass: ''
}

export const dbConfig = {
  host: '127.0.0.1',
  port: '27017',
  dbname: 'blog'
}

export const authConfig = {
  secret: 'onlyblog',
  expire: 60 * 60 * 2 // token 有效期，单位 s
}

export const verifyCodeConfig = {
  template: ``, // 验证码邮件模板
  expire: 60 // 验证码有效时间，单位 s
}
fs.readFile('static/verify-code.html', (err, data) => {
  if (err) throw(err)
  else verifyCodeConfig.template = data.toString('utf-8')
})
