import { Table, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { Book as BookType } from '@/types';

export const Book = ({ book }: { book: BookType }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <ActionIcon.Group>
          <ActionIcon variant='white' color='secondary'>
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant='white' color='red'>
            <IconTrash />
          </ActionIcon>
        </ActionIcon.Group>
      </Table.Td>
      <Table.Td>{book.id}</Table.Td>
      <Table.Td>{book.title}</Table.Td>
      <Table.Td>{book.description}</Table.Td>
    </Table.Tr>
  );
};
