export class AppError extends Error {
  public readonly message: string
  public readonly code: number

  constructor(message: string, code: number = 400) {
    super()

    this.message = message
    this.code = code
  }
}
