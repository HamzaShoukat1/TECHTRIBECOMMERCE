'use client'

import { AuthenticatedLayout } from '@admin/components/layout/authenticated-layout'
import { Orders } from '@admin/features/Orders/page'

export default function AdminTasksPage() {
  return (
    <AuthenticatedLayout>
      <Orders />
    </AuthenticatedLayout>
  )
}