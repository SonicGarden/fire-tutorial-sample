import { AdminBooks } from '@/components/pages/admin/AdminBooks';
import { AdminLayout } from '@/layouts/AdminLayout';
import type { ReactElement } from 'react';

export default function AdminBooksPage() {
  return <AdminBooks />;
}

AdminBooksPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
