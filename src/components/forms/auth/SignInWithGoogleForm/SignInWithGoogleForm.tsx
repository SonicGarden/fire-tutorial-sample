import { IconBrandGoogle } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { LoadingOverlayButton } from '@/components/elements/LoadingOverlayButton';
import { signInWithGoogle } from '@/utils/firebase/auth';
import { notify } from '@/utils/mantine/notifications';

export const SignInWithGoogleForm = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      notify.info({ message: 'サインインしました' });
    } catch (error) {
      console.error(error);
      notify.error({ message: 'サインインに失敗しました' });
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  return (
    <LoadingOverlayButton
      loading={loading}
      onClick={handleClick}
      variant='default'
      leftSection={<IconBrandGoogle />}
      aria-label='Sign in with Google'
    >
      Sign in with Google
    </LoadingOverlayButton>
  );
};
