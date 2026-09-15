"use client"

import { Products } from '@/src/admin/features/products'
import { AuthenticatedLayout } from '@admin/components/layout/authenticated-layout'


export default function page() {
  return (
    <AuthenticatedLayout>
      <Products />
    </AuthenticatedLayout>
  )
}
