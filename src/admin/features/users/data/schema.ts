import { z } from 'zod'

// const userStatusSchema = z.union([
//   z.literal('active'),
//   z.literal('inactive'),
//   z.literal('invited'),
//   z.literal('suspended'),
// ])
// export type UserStatus = 'active' | 'inactive' | 'invited' | 'suspended'

const userRoleSchema = z.union([

  z.literal('ADMIN'),
  z.literal('USER'),
])

const _userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().optional(),
  email: z.string(),
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
})
export type User = z.infer<typeof _userSchema>
