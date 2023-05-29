import { LoginDialog } from '@/components/LoginDialog';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next';
import { getCsrfToken } from 'next-auth/react';
import { Alert } from '@/components/Alert';
import { Page } from '@/components/Page';

export default function Login({
  csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      {csrfToken ? (
        <LoginDialog csrfToken={csrfToken} />
      ) : (
        <Alert message="NextAuth failed to provide token" type={'error'} />
      )}
    </Page>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => ({
  props: {
    csrfToken: await getCsrfToken(context)
  }
});
