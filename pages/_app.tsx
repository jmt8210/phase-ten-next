import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';
import { BareFetcher, SWRConfig } from 'swr';
const montserrat = Montserrat({
  subsets: ['latin']
});

export const globalFetcher: BareFetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

export const globalArrayFetcher = (urls: string[]) => {
  return Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  ) as any;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: globalFetcher
        }}
      >
        <div className={montserrat.className}>
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </SessionProvider>
  );
}
