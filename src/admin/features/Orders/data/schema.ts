import { z } from 'zod'

export const OrderSchema = z.object({
  _id: z.string(),

  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
  }),

  itemCount: z.number(),

  subtotal: z.number(),

  currency: z.string(),

  status: z.string(),

  createdAt: z.string(),
})

export type Order = z.infer<typeof OrderSchema>