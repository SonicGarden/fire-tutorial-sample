import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { z } from 'zod';
import type { PasswordInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

export const passwordConfirmationValidation = z.string().min(1, { message: '入力してください' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PasswordConfirmationInput = <Form extends UseFormReturnType<any>>({
  form,
  ...props
}: { form: Form } & Omit<PasswordInputProps, 'form'>) => {
  const name = 'passwordConfirmation';
  const label = 'パスワード（確認）';

  return <MantinePasswordInput label={label} aria-label={label} {...props} {...form.getInputProps(name)} />;
};
