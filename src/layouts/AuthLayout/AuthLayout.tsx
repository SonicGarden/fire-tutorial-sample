import { useRouter } from 'next/router';
import { ResponsiveLayout, useResponsiveLayoutContext } from '@/components/layouts/ResponsiveLayout';
import { LoadingScreen } from '@/components/screens/LoadingScreen';
import { useAuth, withAuth } from '@/contexts/auth';
import { AdminTitle } from '../_components/AdminTitle';
import { Title } from '../_components/Title';
import type { ReactNode } from 'react';

export const AuthLayout = withAuth(({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { loading, firebaseUser } = useAuth();
  const isAdminPage = router.pathname.startsWith('/admin');
  const rootPath = isAdminPage ? '/admin' : '/';
  const title = isAdminPage ? <AdminTitle /> : <Title />;

  if (loading) return <LoadingScreen />;
  if (firebaseUser) {
    router.push((router.query.redirect ?? rootPath) as string);
    return <LoadingScreen />;
  }

  return (
    <ResponsiveLayout header={{ title, ...(isAdminPage && { props: { bg: 'black', c: 'white' } }) }}>
      {children}
    </ResponsiveLayout>
  );
});

export const useAuthLayout = useResponsiveLayoutContext;
