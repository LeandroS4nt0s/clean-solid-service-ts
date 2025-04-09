import { HttpError } from '@domain/model/erros/HttpError'

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}
