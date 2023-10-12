'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingScreen } from '@/components/screens/LoadingScreen';

export const Root = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/books');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingScreen />;
};
