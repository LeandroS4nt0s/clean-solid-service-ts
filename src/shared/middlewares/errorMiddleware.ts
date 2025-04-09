import { HttpError } from '@domain/model/erros/HttpError'
import { errorResponse } from '@shared/wrappers/httpResponse'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  let statusCode = 500
  let message = 'Internal server error'
  let detail: string | undefined

  if (err instanceof HttpError) {
    statusCode = err.statusCode
    message = err.message
  } else if (err instanceof Error) {
    detail = err.message
  } else {
    detail = 'Unknown error'
  }

  res.status(statusCode).json(errorResponse(message, detail))
}
