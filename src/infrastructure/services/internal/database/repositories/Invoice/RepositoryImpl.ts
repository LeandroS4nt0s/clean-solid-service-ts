import { FilterInvoicesDTO } from '@application/useCases/Invoice/dtos/InvoiceDto'
import { InvoiceEntity } from '@domain/model/entities/InvoiceEntity'
import { InvoiceRepositoryInterface } from '@domain/model/repositories/InvoIceRepository/InvoiceRepository'
import { DataBaseInterface } from '@infra/services/internal/database/interface/DatabaseInterface'
import { InvoiceMapper } from '@infra/services/internal/database/mappers/invoice/InvoiceMapper'
import { InvoiceModel } from '@infra/services/internal/database/models/invoice/InvoiceModel'
import { injectable, inject } from 'tsyringe'
import { DataSource } from 'typeorm'

@injectable()
export class InvoiceRepositoryImpl implements InvoiceRepositoryInterface {
  constructor(@inject('DataBaseService') private dataSource: DataBaseInterface<DataSource>) {}

  async findAll(): Promise<InvoiceEntity[]> {
    const repo = this.dataSource.getInstance().getRepository(InvoiceModel)
    const results = await repo.find()
    return results.map(InvoiceMapper.toEntity)
  }

  async save(invoice: InvoiceEntity): Promise<void> {
    const repo = this.dataSource.getInstance().getRepository(InvoiceModel)
    const model = InvoiceMapper.toModel(invoice)
    await repo.save(model)
  }

  async findByFilters(filtersDTO: FilterInvoicesDTO): Promise<InvoiceEntity[]> {
    const { customerNumber, referenceMonth } = filtersDTO
    const repo = this.dataSource.getInstance().getRepository(InvoiceModel)
    const query = repo.createQueryBuilder('invoice')

    if (customerNumber) {
      query.andWhere('invoice.customerNumber = :customerNumber', { customerNumber })
    }

    if (referenceMonth) {
      query.andWhere('invoice.referenceMonth = :referenceMonth', { referenceMonth })
    }

    const results = await query.getMany()
    return results.map(InvoiceMapper.toEntity)
  }
}
