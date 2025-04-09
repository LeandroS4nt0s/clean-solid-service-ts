import { HttpError } from '@domain/model/erros/HttpError'

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request') {
    super(message, 400)
  }
}
