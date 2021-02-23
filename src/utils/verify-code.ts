import { verifyCodeConfig } from "../config"
import sendMail from "./send-mail"

class VerifyCode {
  private static codeMap: Map<string, { time: number, code: string }> = new Map([])

  private static chars = '0123456789abcdefghijklmnopqrstuvwxyjABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  static async asign(mail: string) {
    const list = []
    const len = this.chars.length

    for (let i = 0; i < 6; i++) list.push(this.chars[Math.ceil(Math.random() * len)])

    const code = list.join('')
    const time = Date.now()

    const param = {
      html: verifyCodeConfig.template.replace('${code}', code),
      subject: 'Onlyblog 后台系统验证码',
      mail
    }
    await sendMail(param)
    this.codeMap.set(mail, { code, time })
    console.log(`验证码 Map: `, this.codeMap)
  }

  static verify(mail: string, _code: string) {
    const { code, time } = this.codeMap.get(mail) || {}

    if (!code || !time || code && code !== _code) return '无效验证码'
    else if (time + verifyCodeConfig.expire * 1000 < Date.now()) {
      this.codeMap.delete(mail)
      return '验证码已过期'
    } else {
      this.codeMap.delete(mail)
      return undefined
    }
  }
}

export default VerifyCode