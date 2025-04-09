import { FindByFilterInvoiceController } from '@presentation/http/modules/Invoice/FindByFilterInvoiceController'
import { ListAllInvoicesController } from '@presentation/http/modules/Invoice/ListAllInvoicesController'
import { asyncHandler } from '@shared/wrappers/asyncHandler'
import { Router } from 'express'
import { container } from 'tsyringe'

const InvoiceRoutes = Router()
const listAllInvoicesController = container.resolve(ListAllInvoicesController)
const findByFilterInvoiceController = container.resolve(FindByFilterInvoiceController)

InvoiceRoutes.get(
  '/',
  asyncHandler(listAllInvoicesController.handle.bind(listAllInvoicesController))
)
InvoiceRoutes.get(
  '/filter',
  asyncHandler(findByFilterInvoiceController.handle.bind(findByFilterInvoiceController))
)

export default InvoiceRoutes
