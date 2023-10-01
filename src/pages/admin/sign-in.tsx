import { AdminSignIn } from '@/components/pages/admin/AdminSignIn';
import { AuthLayout } from '@/layouts/AuthLayout';
import type { ReactElement } from 'react';

export default function AdminSignInPage() {
  return <AdminSignIn />;
}

AdminSignInPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
