import type { Timestamp } from '../utils/firebase';
import type { Book as _Book, BookDocumentData as _BookDocumentData } from '@local/shared';

export type Book = _Book<Timestamp>;
export type BookDocumentData = _BookDocumentData<Timestamp>;
