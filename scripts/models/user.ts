import { getAuth, getConverter, getFirestore } from '../utils/firebase';
import type { UserDocumentData } from '../types/user';

export const userConverter = getConverter<UserDocumentData>();

export const usersRef = () => getFirestore().collection('users').withConverter(userConverter);

export const userRef = (id: string) => usersRef().doc(id);

export const getAuthUserByEmail = async (email: string) => getAuth().getUserByEmail(email);
