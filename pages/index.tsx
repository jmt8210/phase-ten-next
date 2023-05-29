import Link from 'next/link';
import { Page } from '@/components/Page';

export default function Home() {
  return (
    <Page>
      <h1>
        <Link href={'/create'}>Play</Link>
      </h1>
    </Page>
  );
}
