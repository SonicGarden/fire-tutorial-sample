import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  getAuth,
  getIdTokenResult,
  signOut as _signOut,
} from 'firebase/auth';
import type { User, ParsedToken } from 'firebase/auth';

const createUserWithEmailAndPassword = async (email: string, password: string) =>
  _createUserWithEmailAndPassword(getAuth(), email, password);

const signOut = async () => _signOut(getAuth());

export type { User, ParsedToken };
export { createUserWithEmailAndPassword, getAuth, getIdTokenResult, signOut };
