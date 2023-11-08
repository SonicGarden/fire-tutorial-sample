import { useCollectionData as _useCollectionData } from 'react-firebase-hooks/firestore';
import type { Query } from '@/utils/firebase/firestore';

export const useCollectionData = <T>(query?: Query<T> | null) => {
  const [data, loading, error] = _useCollectionData(query, {
    initialValue: [],
    snapshotOptions: { serverTimestamps: 'estimate' },
  });
  if (error) throw error;

  return { data: data as T[], loading };
};
