import { HttpError } from '@domain/model/erros/HttpError'

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}
