import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';
import { SWRConfig } from 'swr';
const montserrat = Montserrat({
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json())
        }}
      >
        <div className={montserrat.className}>
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </SessionProvider>
  );
}
