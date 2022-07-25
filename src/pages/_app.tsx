import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ToastWrapper from '@/components/core/Toast/ToastWrapper';
import { SWRConfig } from 'swr';
import { swrConfig } from '@/helpers/api';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig value={swrConfig}>
    <ToastWrapper>
      <Component {...pageProps} />
    </ToastWrapper>
  </SWRConfig>
);

export default MyApp;
