import type { WithId } from './firebase';

export type BookDocumentData<Timestamp> = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title: string;
  description: string;
  image: {
    path: string;
    url: string;
  };
};

export type Book<Timestamp> = WithId<BookDocumentData<Timestamp>>;
