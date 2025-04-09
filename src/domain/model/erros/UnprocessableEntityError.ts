import { HttpError } from '@domain/model/erros/HttpError'

export class UnprocessableEntityError extends HttpError {
  constructor(message = 'Unprocessable entity') {
    super(message, 422)
  }
}
