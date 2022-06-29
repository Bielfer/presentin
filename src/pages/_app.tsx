import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ToastWrapper from '@/components/core/Toast/ToastWrapper';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ToastWrapper>
    <Component {...pageProps} />
  </ToastWrapper>
);

export default MyApp;
