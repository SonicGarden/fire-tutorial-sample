import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { z } from 'zod';
import type { PasswordInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

export const passwordValidation = z.string().min(8, { message: 'パスワードは8文字以上で入力してください' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PasswordInput = <Form extends UseFormReturnType<any>>({
  form,
  ...props
}: { form: Form } & Omit<PasswordInputProps, 'form'>) => {
  const name = 'password';
  const label = 'パスワード';

  return <MantinePasswordInput label={label} aria-label={label} {...props} {...form.getInputProps(name)} />;
};
