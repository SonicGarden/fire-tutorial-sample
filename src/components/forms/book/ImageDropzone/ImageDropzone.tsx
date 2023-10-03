import { Text, Stack, Image, Input } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback } from 'react';
import { z } from 'zod';
import type { InputWrapperProps } from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';
import type { UseFormReturnType } from '@mantine/form';

export const imageValidation = z.custom<File>((file) => file, { message: '必須項目です' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ImageDropzone = <Form extends UseFormReturnType<any>>({
  form,
  ...props
}: { form: Form } & Omit<InputWrapperProps, 'form'>) => {
  const name = 'image';
  const label = '表紙';
  const handleDrop = useCallback(
    ([file]: FileWithPath[]) => {
      form.setFieldValue(name, file);
    },
    [form],
  );

  return (
    <Input.Wrapper label={label} aria-label={label} {...props} {...form.getInputProps(name)}>
      <Stack>
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={handleDrop}>
          <Text ta='center'>画像を選択してください</Text>
        </Dropzone>
        {form.values.image && <Image src={URL.createObjectURL(form.values.image)} fit='contain' alt='プレビュー' />}
      </Stack>
    </Input.Wrapper>
  );
};
