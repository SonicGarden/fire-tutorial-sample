import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  getAuth,
  getIdTokenResult,
} from 'firebase/auth';
import type { User, ParsedToken } from 'firebase/auth';

const createUserWithEmailAndPassword = async (email: string, password: string) =>
  _createUserWithEmailAndPassword(getAuth(), email, password);

export type { User, ParsedToken };
export { createUserWithEmailAndPassword, getAuth, getIdTokenResult };
