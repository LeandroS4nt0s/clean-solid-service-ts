import { ListAllInvoicesUseCase } from '@application/useCases/Invoice/ListAllInvoicesUseCase'
import { successResponse } from '@shared/wrappers/httpResponse'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListAllInvoicesController {
  constructor(@inject(ListAllInvoicesUseCase) private useCase: ListAllInvoicesUseCase) {}
  async handle(_: Request, res: Response): Promise<Response> {
    const invoices = await this.useCase.execute()
    return res.status(200).json(successResponse('Invoices fetched successfully', invoices))
  }
}
