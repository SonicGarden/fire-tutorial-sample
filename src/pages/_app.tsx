import '@/styles/globals.css';
import '@/utils/firebase/app';
import Head from 'next/head';
import { Layout } from '@/layouts/Layout';
import { MantineProvider } from '@/utils/mantine/provider';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const getDefaultLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;

  return (
    <>
      <Head>
        <title>Firebaseチュートリアル</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1' />
      </Head>
      <MantineProvider>{getLayout(<Component {...pageProps} />)}</MantineProvider>
    </>
  );
}
