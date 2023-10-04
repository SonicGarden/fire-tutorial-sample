import { useRouter } from 'next/router';
import { LoadingScreen } from '@/components/screens/LoadingScreen';

export const Root = () => {
  const router = useRouter();
  router.isReady && router.replace('/books');
  return <LoadingScreen />;
};
