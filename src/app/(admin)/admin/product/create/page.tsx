"use client"

import { AuthenticatedLayout } from '@admin/components/layout/authenticated-layout'
import  { Products } from '@/src/admin/features/products/page'


export default function page() {
  return (
    <AuthenticatedLayout>
      <Products />
    </AuthenticatedLayout>
  )
}
