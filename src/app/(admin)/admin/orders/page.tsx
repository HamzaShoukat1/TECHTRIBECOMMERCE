'use client'

import { AuthenticatedLayout } from '@admin/components/layout/authenticated-layout'
import { Orders } from '@/src/admin/features/Orders'
export default function AdminTasksPage() {
  return (
    <AuthenticatedLayout>
      <Orders />
    </AuthenticatedLayout>
  )
}