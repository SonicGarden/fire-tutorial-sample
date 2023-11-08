import { Card, Grid, Image, Stack, Text } from '@mantine/core';
import type { Book as BookType } from '@/types';

export const Book = ({ book }: { book: BookType }) => {
  return (
    <Card shadow='lg' withBorder w={{ base: '100vw', xs: 400 }}>
      <Grid>
        <Grid.Col span={4}>
          <Image src={book.image.url} alt={book.title} w={100} h='auto' />
        </Grid.Col>
        <Grid.Col span={8}>
          <Stack gap='sm'>
            <Text fw={700} fz='xl' truncate='end'>
              {book.title}
            </Text>
            <Text fz='xs' c='dimmed' lineClamp={5} className='tw-whitespace-pre-wrap'>
              {book.description}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
