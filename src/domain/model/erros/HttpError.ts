export class HttpError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
