import { createContext, useContext, useMemo } from 'react';
import { useAuth as _useAuth } from '@/hooks/useAuth';
import { useUserDocument, userRef } from '@/models/user';
import type { User, Claims, UserRole } from '@/types';
import type { User as FirebaseUser } from '@/utils/firebase/auth';
import type { FC, ReactNode } from 'react';

type AuthContextValue = {
  firebaseUser?: FirebaseUser | null;
  currentUser?: User | null;
  claims?: Claims | null;
  role: UserRole;
  loading: boolean;
};

const DEFAULT_ROLE = 'user';
export const AuthContext = createContext<AuthContextValue>({
  role: DEFAULT_ROLE,
  loading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: firebaseUser, claims, loading: loadingAuth } = _useAuth();
  const { data: currentUser, loading: loadingData } = useUserDocument(userRef(firebaseUser?.uid));
  const role = useMemo(
    () => (claims?.role === currentUser?.role ? claims?.role : DEFAULT_ROLE) as UserRole,
    [currentUser?.role, claims?.role],
  );
  const loading = useMemo(
    () => loadingAuth || loadingData || !!(firebaseUser && !currentUser),
    [loadingAuth, loadingData, firebaseUser, currentUser],
  );

  return (
    <AuthContext.Provider value={{ firebaseUser, currentUser, claims: claims as Claims, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
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
