import crypto from 'crypto'

/**
 * 加密
 */
const encrypt = (password: string): string => {
  const hash = crypto.createHash('md5')
  hash.update(password)
  return hash.digest('base64')
}

export default encrypt
