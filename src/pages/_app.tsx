import '@/styles/globals.css';
import '@/utils/firebase/app';
import Head from 'next/head';
import { Layout } from '@/layouts/Layout';
import { MantineProvider } from '@/utils/mantine/provider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Firebaseチュートリアル</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1' />
      </Head>
      <MantineProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
