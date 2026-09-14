import type { User } from './schema'

export const users: User[] = [
  { id: 'user-001', firstName: 'Amina', lastName: 'Khan', username: 'amina.khan', email: 'amina@example.com', phoneNumber: '', status: 'active', role: 'admin', createdAt: new Date('2026-01-12'), updatedAt: new Date('2026-01-12') },
  { id: 'user-002', firstName: 'Hamza', lastName: 'Ali', username: 'hamza.ali', email: 'hamza@example.com', phoneNumber: '', status: 'active', role: 'manager', createdAt: new Date('2026-02-05'), updatedAt: new Date('2026-02-05') },
  { id: 'user-003', firstName: 'Sara', lastName: 'Malik', username: 'sara.malik', email: 'sara@example.com', phoneNumber: '', status: 'invited', role: 'cashier', createdAt: new Date('2026-03-18'), updatedAt: new Date('2026-03-18') },
]
