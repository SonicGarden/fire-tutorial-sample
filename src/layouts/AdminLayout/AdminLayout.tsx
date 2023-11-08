'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ResponsiveLayout, useResponsiveLayoutContext } from '@/components/layouts/ResponsiveLayout';
import { LoadingScreen } from '@/components/screens/LoadingScreen';
import { NotFoundScreen } from '@/components/screens/NotFoundScreen';
import { withAuth, useAuth } from '@/contexts/auth';
import { usePermissions } from '@/hooks/usePermissions';
import { _Layout } from '../Layout';
import { AccountMenu } from '../_components/AccountMenu';
import { AdminTitle } from '../_components/AdminTitle';
import { AdminNavMenu } from './_components/AdminNavMenu';
import type { ReactNode } from 'react';

export const AdminLayout = withAuth(({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()!;
  const { loading, currentUser } = useAuth();
  const { validatePathPermission } = usePermissions();

  if (loading) return <LoadingScreen />;
  if (!currentUser) {
    router.push(`/admin/sign-in?redirect=${pathname}`);
    return <LoadingScreen />;
  }
  if (!validatePathPermission(pathname))
    return (
      <_Layout>
        <NotFoundScreen />
      </_Layout>
    );

  return (
    <ResponsiveLayout
      header={{ title: <AdminTitle />, props: { bg: 'black', c: 'white' } }}
      navbar={{ navMenu: <AdminNavMenu />, accountMenu: <AccountMenu /> }}
    >
      {children}
    </ResponsiveLayout>
  );
});

export const useAdminLayout = useResponsiveLayoutContext;
