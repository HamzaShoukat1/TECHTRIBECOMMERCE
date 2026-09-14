'use client';

import { AuthenticatedLayout } from "../../../admin/components/layout/authenticated-layout";
import { Dashboard } from "../../../admin/features/dashboard";

export default function AdminPage() {
  return (
    <AuthenticatedLayout>
      <Dashboard />
    </AuthenticatedLayout>
  );
}