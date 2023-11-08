import { Box } from '@mantine/core';
import Link from 'next/link';
import { NavLink } from '@/components/layouts/ResponsiveLayout';

export const AdminNavMenu = () => {
  return (
    <Box aria-label='ナビゲーションメニュー'>
      <NavLink label='書籍管理' component={Link} href='/admin/books' />
    </Box>
  );
};
