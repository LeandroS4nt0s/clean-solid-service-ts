import { FindByFilterInvoiceUseCase } from '@application/useCases/Invoice/FindByFilterInvoiceUseCase'
import { ListAllInvoicesUseCase } from '@application/useCases/Invoice/ListAllInvoicesUseCase'
import { container } from 'tsyringe'

container.register<ListAllInvoicesUseCase>(ListAllInvoicesUseCase, ListAllInvoicesUseCase)
container.register<FindByFilterInvoiceUseCase>(
  FindByFilterInvoiceUseCase,
  FindByFilterInvoiceUseCase
)
