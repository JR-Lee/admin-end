class ApiError extends Error {
  code?: number
  name: string

  constructor(code: number, message?: string) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    Error.captureStackTrace(this) // 捕获堆栈位置信息
  }
}

export default ApiError
