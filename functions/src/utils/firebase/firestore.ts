import { Timestamp, FieldValue, getFirestore as _getFirestore } from 'firebase-admin/firestore';
import { isTest } from '..';
import type { WithId } from '@local/shared';
import type {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  Firestore,
  DocumentReference,
} from 'firebase-admin/firestore';

let firestore: Firestore;
const getFirestore = () => {
  if (firestore) return firestore;

  firestore = _getFirestore();
  firestore.settings({
    preferRest: !isTest(),
    timestampsInSnapshots: true,
  });
  return firestore;
};

const { serverTimestamp: _severTimestamp } = FieldValue;

const serverTimestamp = () => _severTimestamp() as Timestamp;

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

export type { DocumentReference };
export { getConverter, getFirestore, serverTimestamp, Timestamp };
