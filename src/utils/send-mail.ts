import mailer from 'nodemailer'
import { mailConfig } from '../config'
import { logPretty } from '.'

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
    logPretty.info('  正在尝试连接邮件服务器...  \n')
    await transporter.verify()
    logPretty.success('  邮件服务器连接正常  \n')
  } catch (err) {
    logPretty.error('邮件服务器连接异常：' + err.message + '\n')
    process.exit()
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