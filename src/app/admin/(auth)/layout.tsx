import { AuthLayout as _AuthLayout } from '@/layouts/AuthLayout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <_AuthLayout>{children}</_AuthLayout>;
}
