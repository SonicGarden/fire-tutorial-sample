'use client';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/screens/LoadingScreen';

export const Root = () => {
  const router = useRouter();
  router.replace('/books');
  return <LoadingScreen />;
};
