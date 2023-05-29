import { RegisterDialog } from '@/components/RegisterDialog';
import { Page } from '@/components/Page';

export default function Login() {
  return (
    <Page>
      <RegisterDialog />
    </Page>
  );
}

// const { status } = useSession();
// const router = useRouter();
// console.log(router.query.callbackUrl);
// // if (status === 'authenticated')
// //   router.push(router.query.callbackUrl as string);
