import { useCollectionData } from '@/hooks/useCollectionData';
import {
  collection,
  doc,
  getConverter,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@/utils/firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@/utils/firebase/storage';
import type { Book, BookDocumentData } from '@/types';
import type { DocumentReference, QueryConstraint } from '@/utils/firebase/firestore';
import type { StorageReference, UploadMetadata } from '@/utils/firebase/storage';

export const bookConverter = getConverter<BookDocumentData>();

export const booksRef = () => collection(getFirestore(), 'books').withConverter(bookConverter);

type RefOrNull<Id extends string | null | undefined> = Id extends string ? DocumentReference<Book> : null;
export const bookRef = <Id extends string | null | undefined>(id: Id) =>
  (id ? doc(booksRef(), id) : null) as RefOrNull<Id>;

export const newBookRef = () => doc(booksRef());

export const booksQuery = (...queryConstraints: QueryConstraint[]) =>
  query(booksRef(), ...(queryConstraints.length === 0 ? [orderBy('createdAt', 'asc')] : queryConstraints));

export const bookStorageRef = (id: string) => ref(getStorage(), `books/${id}`);

export const bookImageStorageRef = (id: string) => ref(bookStorageRef(id), 'image');

export const uploadImage = async (ref: StorageReference, file: File, metadata: UploadMetadata = {}) =>
  uploadBytes(ref, file, metadata);

export const createBook = async (
  ref: DocumentReference<Book>,
  data: Omit<BookDocumentData, 'createdAt' | 'updatedAt' | 'image'> & { image: File },
) => {
  const { id } = ref;
  const { image, ...rest } = data;
  const metadata = { contentType: image.type };
  const snapshot = await uploadImage(bookImageStorageRef(id), image, metadata);
  const url = await getDownloadURL(snapshot.ref);
  return setDoc(ref, {
    ...rest,
    image: { path: snapshot.ref.fullPath, url },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  } as BookDocumentData);
};

export const useBookCollection = useCollectionData<Book>;
