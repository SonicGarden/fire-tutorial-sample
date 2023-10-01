import { ResponsiveLayout, useResponsiveLayoutContext } from '@/components/layouts/ResponsiveLayout';
import { withAuth } from '@/contexts/auth';
import { Title } from '../_components/Title';
import { AccountMenu } from './_components/AccountMenu';
import type { ReactNode } from 'react';

export const Layout = withAuth(({ children }: { children: ReactNode }) => {
  return (
    <ResponsiveLayout header={{ title: <Title /> }} navbar={{ navMenu: 'ナビメニュー', accountMenu: <AccountMenu /> }}>
      {children}
    </ResponsiveLayout>
  );
});

export const useLayout = useResponsiveLayoutContext;
