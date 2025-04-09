import InvoiceRoutes from '@presentation/http/modules/Invoice/InvoiceRoute'
import { Router } from 'express'

const AppRoutes = Router()
AppRoutes.use('/invoices', [InvoiceRoutes])

export { AppRoutes }
