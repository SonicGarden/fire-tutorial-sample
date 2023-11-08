import { initializeApp as _initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import type { WithId } from '@local/shared';
import type {
  Timestamp,
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  DocumentReference,
} from 'firebase-admin/firestore';

const environments = ['default'] as const;
type Environment = (typeof environments)[number];
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment | undefined;

const initializeApp = async () => {
  if (!environment || !environments.includes(environment)) return false;

  const serviceAccount = await import(`../google_application_credentials/service-account-${environment}.json`);
  return _initializeApp({
    credential: cert(serviceAccount),
  });
};

const { serverTimestamp: _serverTimestamp } = FieldValue;
const serverTimestamp = () => _serverTimestamp() as Timestamp;

const getConverter = <T extends DocumentData>(): FirestoreDataConverter<WithId<T> | T> => ({
  toFirestore: (data: PartialWithFieldValue<WithId<T> | T>): DocumentData => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;
    return rest;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>): WithId<T> => {
    return { id: snapshot.id, ...snapshot.data() } as WithId<T>;
  },
});

const getDocumentData = async <T>(ref: DocumentReference<T>) =>
  ref.get().then((doc) => ({ data: { id: doc.id, ...doc.data() } as T, exists: doc.exists }));

export type { Environment };
export {
  environment,
  environments,
  getAuth,
  getDocumentData,
  getFirestore,
  initializeApp,
  serverTimestamp,
  getConverter,
  Timestamp,
};
