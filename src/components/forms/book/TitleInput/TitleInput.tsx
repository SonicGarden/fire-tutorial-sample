import { TextInput } from '@mantine/core';
import { z } from 'zod';
import type { TextInputProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

export const titleValidation = z.string().min(1, { message: '必須項目です' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TitleInput = <Form extends UseFormReturnType<any>>({
  form,
  ...props
}: { form: Form } & Omit<TextInputProps, 'form'>) => {
  const name = 'title';
  const label = 'タイトル';

  return <TextInput type='text' label={label} aria-label={label} {...props} {...form.getInputProps(name)} />;
};
