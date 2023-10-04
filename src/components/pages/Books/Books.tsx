import { Box, Group, LoadingOverlay } from '@mantine/core';
import { booksQuery, useBookCollection } from '@/models/book';
import { Book } from './_components/Book';

export const Books = () => {
  const { data: books, loading } = useBookCollection(booksQuery());

  return (
    <Box pos='relative'>
      <LoadingOverlay visible={loading} />
      <Group gap='xs' justify='center'>
        {books?.map((book) => <Book key={book.id} book={book} />)}
      </Group>
    </Box>
  );
};
