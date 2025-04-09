import { HttpError } from '@domain/model/erros/HttpError'

export class InternalServerError extends HttpError {
  constructor(message = 'Internal server error') {
    super(message, 500)
  }
}
