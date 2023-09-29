import '@mantine/core/styles.css';
import { MantineProvider as _MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import type { ReactNode } from 'react';

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return <_MantineProvider theme={theme}>{children}</_MantineProvider>;
};
