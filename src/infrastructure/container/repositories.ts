import { InvoiceRepositoryInterface } from '@domain/model/repositories/InvoIceRepository/InvoiceRepository'
import { InvoiceRepositoryImpl } from '@infra/database/repositories/Invoice/RepositoryImpl'
import { container } from 'tsyringe'

container.register<InvoiceRepositoryInterface>(InvoiceRepositoryImpl, InvoiceRepositoryImpl)
