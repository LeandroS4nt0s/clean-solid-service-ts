import { FilterInvoicesDTO } from '@application/useCases/Invoice/dtos/InvoiceDto'
import { InvoiceEntity } from '@domain/model/entities/InvoiceEntity'
import { InvoiceRepositoryInterface } from '@domain/model/repositories/InvoIceRepository/InvoiceRepository'
import { InvoiceFilterCriteria } from '@domain/model/repositories/InvoIceRepository/criteria/InvoiceFilterCriteria'
import { InvoiceRepositoryImpl } from '@infra/database/repositories/Invoice/RepositoryImpl'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindByFilterInvoiceUseCase {
  constructor(@inject(InvoiceRepositoryImpl) private repository: InvoiceRepositoryInterface) {}
  async execute(dto: FilterInvoicesDTO): Promise<InvoiceEntity[]> {
    const criteria: InvoiceFilterCriteria = {
      referenceMonth: dto.referenceMonth,
      customerNumber: dto.customerNumber,
    }

    return this.repository.findByFilters(criteria)
  }
}
