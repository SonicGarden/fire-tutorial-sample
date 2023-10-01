import { ResponsiveLayout, useResponsiveLayoutContext } from '@/components/layouts/ResponsiveLayout';
import { withAuth } from '@/contexts/auth';
import type { ReactNode } from 'react';

export const Layout = withAuth(({ children }: { children: ReactNode }) => {
  return (
    <ResponsiveLayout
      header={{ title: 'Firebaseチュートリアル' }}
      navbar={{ navMenu: 'ナビメニュー', accountMenu: 'アカウントメニュー' }}
    >
      {children}
    </ResponsiveLayout>
  );
});

export const useLayout = useResponsiveLayoutContext;
