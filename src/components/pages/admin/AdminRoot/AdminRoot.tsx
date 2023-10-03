import { useRouter } from 'next/router';
import { LoadingScreen } from '@/components/screens/LoadingScreen';

export const AdminRoot = () => {
  const router = useRouter();
  router.replace('/admin/books');
  return <LoadingScreen />;
};
