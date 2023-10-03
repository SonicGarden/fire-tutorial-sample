import { Table, ActionIcon, Image } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useCallback } from 'react';
import { UnstyledConfirmButton } from '@/components/elements/ConfirmButton';
import { UnstyledModalButton } from '@/components/elements/ModalButton';
import type { Book as BookType } from '@/types';

export const Book = ({ book }: { book: BookType }) => {
  const handleConfirm = useCallback(() => {}, []);

  return (
    <Table.Tr>
      <Table.Td>
        <ActionIcon.Group>
          <ActionIcon
            variant='white'
            color='secondary'
            component={UnstyledModalButton}
            modalContent={() => '更新フォーム'}
            modalProps={{ title: '書籍' }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            variant='white'
            color='red'
            component={UnstyledConfirmButton}
            message='本当に削除しますか？'
            onConfirm={handleConfirm}
          >
            <IconTrash />
          </ActionIcon>
        </ActionIcon.Group>
      </Table.Td>
      <Table.Td>{book.id}</Table.Td>
      <Table.Td>
        <Image src={book.image.url} h={100} w='auto' alt='表紙' />
      </Table.Td>
      <Table.Td>{book.title}</Table.Td>
      <Table.Td className='tw-whitespace-pre-wrap'>{book.description}</Table.Td>
    </Table.Tr>
  );
};
