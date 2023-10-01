import { AdminRoot } from '@/components/pages/admin/AdminRoot';
import { AdminLayout } from '@/layouts/AdminLayout';
import type { ReactElement } from 'react';

export default function AdminRootPage() {
  return <AdminRoot />;
}

AdminRootPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
