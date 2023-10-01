import { useCallback } from 'react';
import { useAuth } from '@/contexts/auth';

export const usePermissions = () => {
  const { role } = useAuth();
  const validatePathPermission = useCallback(
    (path: string) => {
      if (path.startsWith('/admin') && role === 'user') return false;
      return true;
    },
    [role],
  );

  return { validatePathPermission };
};
