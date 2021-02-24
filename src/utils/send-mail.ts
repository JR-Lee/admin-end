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

export const mailVerify = async () => {
  try {
    await transporter.verify()
    console.log('邮件服务器连接正常')
  } catch (err) {
    throw(new Error('邮件服务器连接异常：' + err.message))
  }
}

export default function sendMail({ html, subject, mail }: { html: string, subject: string, mail: string }) {
  return transporter.sendMail({
    from: user,
    to: mail,
    subject,
    html
  })
}