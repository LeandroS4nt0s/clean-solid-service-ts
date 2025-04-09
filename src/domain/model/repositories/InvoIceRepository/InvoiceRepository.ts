import { InvoiceEntity } from '@domain/model/entities/InvoiceEntity'
import { InvoiceFilterCriteria } from '@domain/model/repositories/InvoIceRepository/criteria/InvoiceFilterCriteria'

export interface InvoiceRepositoryInterface {
  save(invoice: InvoiceEntity): Promise<void>
  findAll(): Promise<InvoiceEntity[]>
  findByFilters(filter: InvoiceFilterCriteria): Promise<InvoiceEntity[]>
}
