import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider as _MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import type { ReactNode } from 'react';

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <_MantineProvider theme={theme}>
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </_MantineProvider>
  );
};
