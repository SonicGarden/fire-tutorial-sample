import { redirect } from 'next/navigation';

export const AdminRoot = () => {
  redirect('/admin/books');
};
