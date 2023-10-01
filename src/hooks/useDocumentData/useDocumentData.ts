import { useDocumentData as _useDocumentData } from 'react-firebase-hooks/firestore';
import type { DocumentReference } from '@/utils/firebase/firestore';

export const useDocumentData = <T>(ref?: DocumentReference<T> | null) => {
  const [data, loading] = _useDocumentData(ref, { snapshotOptions: { serverTimestamps: 'estimate' } });
  return { data, loading };
};
