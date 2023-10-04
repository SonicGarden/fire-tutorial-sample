import { ActionIcon, Card, Group, Image, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import type { Book as BookType } from '@/types';

export const Book = ({ book }: { book: BookType }) => {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <Card shadow='lg' withBorder w={{ base: 180, xs: 300 }} pos='relative'>
      <Card.Section>
        <Image src={book.image.url} alt={book.title} w='100%' h='auto' />
      </Card.Section>
      <Card.Section
        pos='absolute'
        bottom={0}
        p={{ base: 'xs', xs: 'md' }}
        w='100%'
        h={{ base: opened ? 150 : 64, xs: opened ? 200 : 72 }}
        bg='white'
      >
        <Stack>
          <Group justify='space-between' wrap='nowrap'>
            <Text fw={700} fz={{ base: 'xs', xs: 'lg' }} truncate='end'>
              {book.title}
            </Text>
            <ActionIcon variant='white' onClick={toggle} size='xs'>
              {opened ? <IconChevronDown /> : <IconChevronUp />}
            </ActionIcon>
          </Group>
          <Text fz={{ base: 'xs', xs: 'sm' }} c='dimmed' lineClamp={4} className='tw-whitespace-pre-wrap'>
            {book.description}
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  );
};
