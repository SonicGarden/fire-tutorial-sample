import { SignIn } from '@/components/pages/SignIn';
import { AuthLayout } from '@/layouts/AuthLayout';
import type { ReactElement } from 'react';

export default function SignInPage() {
  return <SignIn />;
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
