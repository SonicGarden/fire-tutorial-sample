'use client';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/screens/LoadingScreen';

export const AdminRoot = () => {
  const router = useRouter();
  router.replace('/admin/books');
  return <LoadingScreen />;
};
