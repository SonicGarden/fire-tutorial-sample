import { SignUp } from '@/components/pages/SignUp';
import { AuthLayout } from '@/layouts/AuthLayout';
import type { ReactElement } from 'react';

export default function SignUpPage() {
  return <SignUp />;
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
