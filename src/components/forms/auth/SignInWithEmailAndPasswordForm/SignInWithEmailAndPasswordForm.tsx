import { Stack, Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { LoadingOverlayButton } from '@/components/elements/LoadingOverlayButton';
import { signInWithEmailAndPassword } from '@/utils/firebase/auth';
import { notify } from '@/utils/mantine/notifications';
import { emailValidation, EmailInput } from '../EmailInput';
import { passwordValidation, PasswordInput } from '../PasswordInput';

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const SignInWithEmailAndPasswordForm = () => {
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: { email: '', password: '' },
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async ({ email, password }: FormValues) => {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(email, password);
        notify.info({ message: 'サインインしました' });
        // NOTE: ローディングを解除すると一瞬フォームが表示されるので、ここでは解除しない
      } catch (error) {
        console.error(error);
        notify.error({ message: 'サインインに失敗しました' });
        setLoading(false);
      }
    },
    [setLoading],
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} aria-label='サインインフォーム'>
      <Stack gap='md'>
        <EmailInput form={form} withAsterisk />
        <PasswordInput form={form} withAsterisk />
      </Stack>
      <Group justify='flex-end' mt='lg'>
        <LoadingOverlayButton type='submit' variant='outline' aria-label='サインイン' loading={loading}>
          サインイン
        </LoadingOverlayButton>
      </Group>
    </form>
  );
};
