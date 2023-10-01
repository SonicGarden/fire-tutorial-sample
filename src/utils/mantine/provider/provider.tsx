import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider as _MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import type { ReactNode } from 'react';

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <_MantineProvider theme={theme}>
      <Notifications />
      {children}
    </_MantineProvider>
  );
};
