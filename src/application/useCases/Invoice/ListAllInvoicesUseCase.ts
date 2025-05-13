import { InvoiceEntity } from '@domain/model/entities/InvoiceEntity'
import { InvoiceRepositoryInterface } from '@domain/model/repositories/InvoIceRepository/InvoiceRepository'
import { InvoiceRepositoryImpl } from '@infra/services/internal/database/repositories/Invoice/RepositoryImpl'
import { injectable, inject } from 'tsyringe'

@injectable()
export class ListAllInvoicesUseCase {
  constructor(@inject(InvoiceRepositoryImpl) private repository: InvoiceRepositoryInterface) {}
  async execute(): Promise<InvoiceEntity[]> {
    return this.repository.findAll()
  }
}
