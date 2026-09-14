'use client'

import { AuthenticatedLayout } from '@admin/components/layout/authenticated-layout'
import { Users } from '@admin/features/users'

export default function AdminOrdersPage() {
  return (
    <AuthenticatedLayout>
      <Users />
    </AuthenticatedLayout>
  )
}