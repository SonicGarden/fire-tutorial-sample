import { Stack, Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { LoadingOverlayButton } from '@/components/elements/LoadingOverlayButton';
import { createUserWithEmailAndPassword } from '@/utils/firebase/auth';
import { notify } from '@/utils/mantine/notifications';
import { emailValidation, EmailInput } from '../EmailInput';
import { passwordConfirmationValidation, PasswordConfirmationInput } from '../PasswordConfirmationInput';
import { passwordValidation, PasswordInput } from '../PasswordInput';

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const schema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    passwordConfirmation: passwordConfirmationValidation,
  })
  .refine(({ password, passwordConfirmation }) => !passwordConfirmation || password === passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
  });

export const SignUpForm = () => {
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: { email: '', password: '', passwordConfirmation: '' },
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async ({ email, password }: FormValues) => {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(email, password);
        notify.info({ message: 'サインアップしました' });
        // NOTE: ローディングを解除すると一瞬フォームが表示されるので、ここでは解除しない
      } catch (error) {
        console.error(error);
        notify.error({ message: 'サインアップに失敗しました' });
        setLoading(false);
      }
    },
    [setLoading],
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} aria-label='サインアップフォーム'>
      <Stack gap='md'>
        <EmailInput form={form} withAsterisk />
        <PasswordInput form={form} withAsterisk />
        <PasswordConfirmationInput form={form} withAsterisk />
      </Stack>
      <Group justify='flex-end' mt='lg'>
        <LoadingOverlayButton type='submit' variant='outline' aria-label='サインアップ' loading={loading}>
          サインアップ
        </LoadingOverlayButton>
      </Group>
    </form>
  );
};
