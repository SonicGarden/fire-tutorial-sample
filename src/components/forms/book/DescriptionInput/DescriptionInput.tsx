import { Textarea } from '@mantine/core';
import { z } from 'zod';
import type { TextareaProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

export const descriptionValidation = z.string().min(1, { message: '必須項目です' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DescriptionInput = <Form extends UseFormReturnType<any>>({
  form,
  ...props
}: { form: Form } & Omit<TextareaProps, 'form'>) => {
  const name = 'description';
  const label = '説明';

  return (
    <Textarea
      label={label}
      aria-label={label}
      minRows={3}
      maxRows={5}
      autosize
      {...props}
      {...form.getInputProps(name)}
    />
  );
};
