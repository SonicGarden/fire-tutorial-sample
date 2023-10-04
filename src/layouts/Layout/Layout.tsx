import { ResponsiveLayout, useResponsiveLayoutContext } from '@/components/layouts/ResponsiveLayout';
import { withAuth } from '@/contexts/auth';
import { AccountMenu } from '../_components/AccountMenu';
import { Title } from '../_components/Title';
import { NavMenu } from './_components/NavMenu';
import type { ReactNode } from 'react';

export const _Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ResponsiveLayout header={{ title: <Title /> }} navbar={{ navMenu: <NavMenu />, accountMenu: <AccountMenu /> }}>
      {children}
    </ResponsiveLayout>
  );
};

export const Layout = withAuth(_Layout);

export const useLayout = useResponsiveLayoutContext;
