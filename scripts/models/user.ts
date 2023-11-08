import { getAuth, getConverter, getFirestore, serverTimestamp } from '../utils/firebase';
import type { UserDocumentData } from '../types/user';
import type { DocumentReference } from '../utils/firebase';
import type { PartiallyPartial } from '@local/shared';

export const userConverter = getConverter<UserDocumentData>();

export const usersRef = () => getFirestore().collection('users').withConverter(userConverter);

export const userRef = (id: string) => usersRef().doc(id);

export const getAuthUserByEmail = async (email: string) => getAuth().getUserByEmail(email);

export const createFirebaseUser = async (
  ref: DocumentReference<UserDocumentData>,
  data: PartiallyPartial<UserDocumentData, 'createdAt' | 'updatedAt'>,
) => {
  await ref.create({
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...data,
  });
};

export const createAdminUser = async (email: string) => {
  const auth = getAuth();
  const user = await auth.createUser({ email, emailVerified: true });
  await auth.setCustomUserClaims(user.uid, { role: 'admin' });
  await createFirebaseUser(userRef(user.uid), { email, role: 'admin' });
  return { uid: user.uid };
};
