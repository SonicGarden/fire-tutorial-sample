import { useCallback, useState, useMemo } from 'react';
import { useAuthState as _useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, getIdTokenResult } from '@/utils/firebase/auth';
import type { User, ParsedToken } from '@/utils/firebase/auth';

export const useAuth = () => {
  const [claims, setClaims] = useState<ParsedToken | null | undefined>();
  const onUserChanged = useCallback(
    async (user: User | null) => {
      const result = user && (await getIdTokenResult(user, true));
      setClaims(result?.claims || null);
    },
    [setClaims],
  );
  const [user, _loading] = _useAuthState(getAuth(), { onUserChanged });
  const loading = useMemo(() => _loading || claims === undefined, [_loading, claims]);

  return { user, claims, loading };
};
