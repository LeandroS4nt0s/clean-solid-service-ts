import { HttpError } from '@domain/model/erros/HttpError'

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(message, 409)
  }
}
