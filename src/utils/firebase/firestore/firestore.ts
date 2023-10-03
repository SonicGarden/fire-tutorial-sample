import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  serverTimestamp as _serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import type { WithId } from '@local/shared';
import type {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  PartialWithFieldValue,
  Query,
  QueryConstraint,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

const getConverter = <T extends DocumentData>(): FirestoreDataConverter<WithId<T>> => ({
  toFirestore: (data: PartialWithFieldValue<WithId<T> | T>): DocumentData => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;
    return rest;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>, options: SnapshotOptions): WithId<T> => {
    return { id: snapshot.id, ...snapshot.data(options) };
  },
});

const serverTimestamp = _serverTimestamp as unknown as () => Timestamp;

export type { DocumentReference, Query, QueryConstraint };
export { collection, doc, getConverter, getFirestore, orderBy, query, serverTimestamp, setDoc, Timestamp };
