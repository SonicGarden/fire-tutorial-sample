import { Stack, Group, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { LoadingOverlayButton } from '@/components/elements/LoadingOverlayButton';
import { createBook, newBookRef } from '@/models/book';
import { notify } from '@/utils/mantine/notifications';
import { DescriptionInput, descriptionValidation } from '../DescriptionInput';
import { ImageDropzone, imageValidation } from '../ImageDropzone';
import { TitleInput, titleValidation } from '../TitleInput';
import type { BookDocumentData } from '@/types';

type FormValues = {
  title: BookDocumentData['title'];
  description: BookDocumentData['description'];
  image: File | null;
};

const schema = z.object({
  title: titleValidation,
  description: descriptionValidation,
  image: imageValidation,
});

export const CreateBookForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}) => {
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: {
      title: '',
      description: '',
      image: null,
    },
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        setLoading(true);
        await createBook(newBookRef(), { ...values, image: values.image! });
        await onSubmit?.();
        notify.info({ message: '書籍を作成しました' });
      } catch (error) {
        console.error(error);
        notify.error({ message: '作成に失敗しました' });
      } finally {
        setLoading(false);
      }
    },
    [onSubmit],
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={10}>
        <TitleInput form={form} withAsterisk />
        <DescriptionInput form={form} withAsterisk />
        <ImageDropzone form={form} withAsterisk />
      </Stack>
      <Group justify='flex-end' mt={20}>
        <Button.Group>
          {onCancel && (
            <Button variant='outline' onClick={onCancel}>
              キャンセル
            </Button>
          )}
          <LoadingOverlayButton type='submit' loading={loading}>
            作成
          </LoadingOverlayButton>
        </Button.Group>
      </Group>
    </form>
  );
};
