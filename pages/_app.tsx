import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={montserrat.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
