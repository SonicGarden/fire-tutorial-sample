import { useRouter } from 'next/router';
import { LoadingScreen } from '@/components/screens/LoadingScreen';

export const AdminRoot = () => {
  const router = useRouter();
  router.isReady && router.replace('/admin/books');
  return <LoadingScreen />;
};
