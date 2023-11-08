import { getConverter, getFirestore, serverTimestamp } from '../utils/firebase';
import type { UserDocumentData } from '../types/user';
import type { DocumentReference } from '../utils/firebase';
import type { PartiallyPartial } from '@local/shared';

export const userConverter = getConverter<UserDocumentData>();

export const usersRef = () => getFirestore().collection('users').withConverter(userConverter);

export const userRef = (id: string) => usersRef().doc(id);

export const createUser = async (
  ref: DocumentReference<UserDocumentData>,
  data: PartiallyPartial<UserDocumentData, 'createdAt' | 'updatedAt'>,
) => {
  await ref.create({
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...data,
  });
};
