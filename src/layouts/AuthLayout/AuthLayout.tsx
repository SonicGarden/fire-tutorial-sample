'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ResponsiveLayout, useResponsiveLayoutContext } from '@/components/layouts/ResponsiveLayout';
import { LoadingScreen } from '@/components/screens/LoadingScreen';
import { useAuth, withAuth } from '@/contexts/auth';
import { AdminTitle } from '../_components/AdminTitle';
import { Title } from '../_components/Title';
import type { ReactNode } from 'react';

export const AuthLayout = withAuth(({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading, firebaseUser } = useAuth();
  const isAdminPage = pathname?.startsWith('/admin') ?? false;
  const rootPath = isAdminPage ? '/admin' : '/';
  const title = isAdminPage ? <AdminTitle /> : <Title />;

  if (loading) return <LoadingScreen />;
  if (firebaseUser) {
    router.push((searchParams?.get('redirect') ?? rootPath) as string);
    return <LoadingScreen />;
  }

  return (
    <ResponsiveLayout header={{ title, ...(isAdminPage && { props: { bg: 'black', c: 'white' } }) }}>
      {children}
    </ResponsiveLayout>
  );
});

export const useAuthLayout = useResponsiveLayoutContext;
