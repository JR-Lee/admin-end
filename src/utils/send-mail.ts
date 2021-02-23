import mailer from 'nodemailer'
import { mailConfig } from '../config'

const { host, port, user, pass } = mailConfig

const transporter = mailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user,
    pass
  }
})

transporter.verify()
  .then(() => console.log('邮件服务器连接正常'))
  .catch(() => { throw('邮件服务器连接异常') })

export default function sendMail({ html, subject, mail }: { html: string, subject: string, mail: string }) {
  return transporter.sendMail({
    from: user,
    to: mail,
    subject,
    html
  })
}