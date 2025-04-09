import { HttpError } from '@domain/model/erros/HttpError'

export class NotFoundError extends HttpError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404)
  }
}
