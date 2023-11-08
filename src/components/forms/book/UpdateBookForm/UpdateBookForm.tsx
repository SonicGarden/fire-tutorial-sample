import { Stack, Group, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { LoadingOverlayButton } from '@/components/elements/LoadingOverlayButton';
import { bookRef, updateBook } from '@/models/book';
import { notify } from '@/utils/mantine/notifications';
import { DescriptionInput, descriptionValidation } from '../DescriptionInput';
import { ImageDropzone, updateImageValidation } from '../ImageDropzone';
import { TitleInput, titleValidation } from '../TitleInput';
import type { Book, BookDocumentData } from '@/types';

type FormValues = {
  title: BookDocumentData['title'];
  description: BookDocumentData['description'];
  image: File | null;
};

const schema = z.object({
  title: titleValidation,
  description: descriptionValidation,
  image: updateImageValidation,
});

export const UpdateBookForm = ({
  book,
  onSubmit,
  onCancel,
}: {
  book: Book;
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}) => {
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: {
      title: book.title,
      description: book.description,
      image: null,
    },
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        setLoading(true);
        await updateBook(bookRef(book.id), values);
        await onSubmit?.();
        notify.info({ message: '書籍を更新しました' });
      } catch (error) {
        console.error(error);
        notify.error({ message: '更新に失敗しました' });
      } finally {
        setLoading(false);
      }
    },
    [book.id, onSubmit],
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={10}>
        <TitleInput form={form} withAsterisk />
        <DescriptionInput form={form} withAsterisk />
        <ImageDropzone form={form} />
      </Stack>
      <Group justify='flex-end' mt={20}>
        <Button.Group>
          {onCancel && (
            <Button variant='outline' onClick={onCancel}>
              キャンセル
            </Button>
          )}
          <LoadingOverlayButton type='submit' loading={loading}>
            更新
          </LoadingOverlayButton>
        </Button.Group>
      </Group>
    </form>
  );
};
