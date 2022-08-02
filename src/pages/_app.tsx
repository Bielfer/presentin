import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ToastWrapper from '@/components/core/Toast/ToastWrapper';
import { SWRConfig } from 'swr';
import { swrConfig } from '@/helpers/api';
import AuthProvider from '@/contexts/auth';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig value={swrConfig}>
    <ToastWrapper>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ToastWrapper>
  </SWRConfig>
);

export default MyApp;
