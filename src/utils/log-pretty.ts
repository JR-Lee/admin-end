import chalk from 'chalk'

const log = console.log

export default {
  info: (message: string) => log(
    chalk
      .rgb(255,255,255)
      .bgRgb(144, 147, 153)
      .italic(message)
  ),
  success: (message: string) => log(
    chalk
      .rgb(255,255,255)
      .bgRgb(103,194,58)
      .italic(message)
  ),
  warning: (message: string) => log(
    chalk
      .rgb(255,255,255)
      .bgRgb(230, 162, 60)
      .italic(message)
  ),
  error: (message: string) => log(
    chalk
      .rgb(255,255,255)
      .bgRgb(245, 108, 108)
      .italic(message)
  )
}