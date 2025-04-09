import { FindByFilterInvoiceUseCase } from '@application/useCases/Invoice/FindByFilterInvoiceUseCase'
import {
  FilterInvoicesDTO,
  FilterInvoicesSchema,
} from '@application/useCases/Invoice/dtos/InvoiceDto'
import { UnprocessableEntityError } from '@domain/model/erros/UnprocessableEntityError'
import { successResponse } from '@shared/wrappers/httpResponse'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindByFilterInvoiceController {
  constructor(@inject(FindByFilterInvoiceUseCase) private useCase: FindByFilterInvoiceUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const parseResult = FilterInvoicesSchema.safeParse(req.query)

    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors
        .map(error => `${error.path.join('.')} - ${error.message}`)
        .join(', ')

      throw new UnprocessableEntityError(errorDetails)
    }

    const queryParams: FilterInvoicesDTO = parseResult.data
    const invoices = await this.useCase.execute(queryParams)
    return res.status(200).json(successResponse('Invoices fetched filtered successfully', invoices))
  }
}
