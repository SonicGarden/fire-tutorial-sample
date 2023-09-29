import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export { getApp };
