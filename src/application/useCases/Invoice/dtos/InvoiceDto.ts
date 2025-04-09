import { z } from 'zod'

export const FilterInvoicesSchema = z.object({
  customerNumber: z.string().optional(), // 12345678
  referenceMonth: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(), // 2025-03
})

export type FilterInvoicesDTO = z.infer<typeof FilterInvoicesSchema>
