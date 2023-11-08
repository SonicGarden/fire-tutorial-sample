import { useRouter } from 'next/router';
import { ResponsiveLayout, useResponsiveLayoutContext } from '@/components/layouts/ResponsiveLayout';
import { LoadingScreen } from '@/components/screens/LoadingScreen';
import { useAuth, withAuth } from '@/contexts/auth';
import { Title } from '../_components/Title';
import type { ReactNode } from 'react';

export const AuthLayout = withAuth(({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { loading, firebaseUser } = useAuth();

  if (loading) return <LoadingScreen />;
  if (firebaseUser) {
    router.push((router.query.redirect ?? '/') as string);
    return <LoadingScreen />;
  }

  return <ResponsiveLayout header={{ title: <Title /> }}>{children}</ResponsiveLayout>;
});

export const useAuthLayout = useResponsiveLayoutContext;
