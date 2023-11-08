import { useCollectionData } from '@/hooks/useCollectionData';
import {
  collection,
  deleteDoc,
  doc,
  getConverter,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@/utils/firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from '@/utils/firebase/storage';
import type { Book, BookDocumentData } from '@/types';
import type { DocumentReference, QueryConstraint, UpdateData } from '@/utils/firebase/firestore';
import type { StorageReference } from '@/utils/firebase/storage';

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

export const uploadImage = async (ref: StorageReference, image: File) => {
  const metadata = { contentType: image.type };
  const snapshot = await uploadBytes(ref, image, metadata);
  const url = await getDownloadURL(snapshot.ref);
  return { snapshot, url };
};

export const createBook = async (
  ref: DocumentReference<Book>,
  data: Omit<BookDocumentData, 'createdAt' | 'updatedAt' | 'image'> & { image: File },
) => {
  const { id } = ref;
  const { image, ...rest } = data;
  const { snapshot, url } = await uploadImage(bookImageStorageRef(id), image);
  return setDoc(ref, {
    ...rest,
    image: { path: snapshot.ref.fullPath, url },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  } as BookDocumentData);
};

export const updateBook = async (
  ref: DocumentReference<Book>,
  data: UpdateData<Omit<Book, 'image'>> & { image?: File | null },
) => {
  const { id } = ref;
  const { image, ...rest } = data;
  const { snapshot, url } = image ? await uploadImage(bookImageStorageRef(id), image) : { snapshot: null, url: null };
  return updateDoc(ref, {
    ...rest,
    ...(snapshot && { image: { path: snapshot.ref.fullPath, url } }),
    updatedAt: serverTimestamp(),
  });
};

export const deleteBook = async (book: Book) => {
  await deleteObject(ref(getStorage(), book.image.path));
  return deleteDoc(bookRef(book.id));
};

export const useBookCollection = useCollectionData<Book>;
