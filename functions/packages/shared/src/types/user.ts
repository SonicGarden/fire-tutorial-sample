import type { WithId } from './firebase';

export type UserRole = 'user';

export type UserDocumentData<Timestamp> = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  email: string;
  role: UserRole;
};

export type User<Timestamp> = WithId<UserDocumentData<Timestamp>>;

export type Claims = {
  role: UserRole;
};
