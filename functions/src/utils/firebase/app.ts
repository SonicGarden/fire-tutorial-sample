import { initializeApp, getApps } from 'firebase-admin/app';

getApps().length === 0 && initializeApp();
