import { useDocumentData } from '@/hooks/useDocumentData';
import { collection, doc, getConverter, getFirestore } from '@/utils/firebase/firestore';
import type { User, UserDocumentData } from '@/types';
import type { DocumentReference } from '@/utils/firebase/firestore';

export const userConverter = getConverter<UserDocumentData>();

export const usersRef = () => collection(getFirestore(), 'users').withConverter(userConverter);

type RefOrNull<Id extends string | null | undefined> = Id extends string ? DocumentReference<User> : null;
export const userRef = <Id extends string | null | undefined>(id: Id) =>
  (id ? doc(usersRef(), id) : null) as RefOrNull<Id>;

export const useUserDocument = useDocumentData<User>;
