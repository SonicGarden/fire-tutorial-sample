import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  getAuth,
  getIdTokenResult,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
} from 'firebase/auth';
import type { User, ParsedToken } from 'firebase/auth';

const createUserWithEmailAndPassword = async (email: string, password: string) =>
  _createUserWithEmailAndPassword(getAuth(), email, password);

const signInWithEmailAndPassword = async (email: string, password: string) =>
  _signInWithEmailAndPassword(getAuth(), email, password);

const signOut = async () => _signOut(getAuth());

export type { User, ParsedToken };
export { createUserWithEmailAndPassword, getAuth, getIdTokenResult, signInWithEmailAndPassword, signOut };
