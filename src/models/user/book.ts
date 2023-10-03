import { useCollectionData } from '@/hooks/useCollectionData';
import { collection, doc, getConverter, getFirestore, orderBy, query } from '@/utils/firebase/firestore';
import type { Book, BookDocumentData } from '@/types';
import type { DocumentReference, QueryConstraint } from '@/utils/firebase/firestore';

export const bookConverter = getConverter<BookDocumentData>();

export const booksRef = () => collection(getFirestore(), 'books').withConverter(bookConverter);

type RefOrNull<Id extends string | null | undefined> = Id extends string ? DocumentReference<Book> : null;
export const bookRef = <Id extends string | null | undefined>(id: Id) =>
  (id ? doc(booksRef(), id) : null) as RefOrNull<Id>;

export const booksQuery = (...queryConstraints: QueryConstraint[]) =>
  query(booksRef(), ...(queryConstraints.length === 0 ? [orderBy('createdAt', 'asc')] : queryConstraints));

export const useBookCollection = useCollectionData<Book>;
