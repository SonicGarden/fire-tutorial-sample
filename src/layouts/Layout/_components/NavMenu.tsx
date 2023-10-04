import { Box } from '@mantine/core';
import Link from 'next/link';
import { NavLink } from '@/components/layouts/ResponsiveLayout';

export const NavMenu = () => {
  return (
    <Box aria-label='ナビゲーションメニュー'>
      <NavLink label='書籍' component={Link} href='/books' />
    </Box>
  );
};
