import { Box, Stack, Title, Group, Table, ActionIcon } from '@mantine/core';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { UnstyledModalButton } from '@/components/elements/ModalButton';
import { CreateBookForm } from '@/components/forms/book/CreateBookForm';
import { useBookCollection, booksQuery } from '@/models/user/book';
import { Book } from './_components/Book';

export const AdminBooks = () => {
  const { data: books } = useBookCollection(booksQuery());

  return (
    <Box>
      <Stack gap='sm' mb='sm'>
        <Title order={1} size='h5'>
          書籍管理
        </Title>
        <Group justify='flex-end'>
          <ActionIcon.Group>
            <ActionIcon
              variant='white'
              component={UnstyledModalButton}
              modalContent={({ close }) => <CreateBookForm onSubmit={close} onCancel={close} />}
              modalProps={{ title: '書籍' }}
            >
              <IconSquareRoundedPlus />
            </ActionIcon>
          </ActionIcon.Group>
        </Group>
      </Stack>
      <Table withColumnBorders withTableBorder verticalSpacing='sm'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>タイトル</Table.Th>
            <Table.Th>説明</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
