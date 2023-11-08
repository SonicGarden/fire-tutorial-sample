import { createContext, useContext } from 'react';
import { useAuth as _useAuth } from '@/hooks/useAuth';
import type { User as FirebaseUser, ParsedToken } from '@/utils/firebase/auth';
import type { FC, ReactNode } from 'react';

type AuthContextValue = {
  firebaseUser?: FirebaseUser | null;
  claims?: ParsedToken | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  loading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: firebaseUser, claims, loading } = _useAuth();

  return <AuthContext.Provider value={{ firebaseUser, claims, loading }}>{children}</AuthContext.Provider>;
};

export type WithAuthProps = {
  children: ReactNode;
};

export const withAuth = (WrappedComponent: FC<WithAuthProps>) => {
  const WithAuth = ({ children }: { children?: ReactNode }) => (
    <AuthProvider>
      <WrappedComponent>{children}</WrappedComponent>
    </AuthProvider>
  );

  return WithAuth;
};

export const useAuth = () => useContext(AuthContext);
