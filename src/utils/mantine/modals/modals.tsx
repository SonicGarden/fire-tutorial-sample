import { Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import type { ReactNode } from 'react';

export const confirm = ({
  title,
  message,
  onConfirm,
}: {
  title?: ReactNode;
  message: ReactNode;
  onConfirm: Parameters<typeof openConfirmModal>[0]['onConfirm'];
}) =>
  openConfirmModal({
    title,
    children:
      typeof message === 'string' ? (
        <Text size='sm' className='tw-whitespace-pre-wrap'>
          {message}
        </Text>
      ) : (
        message
      ),
    labels: { confirm: 'OK', cancel: 'Cancel' },
    onConfirm,
  });
