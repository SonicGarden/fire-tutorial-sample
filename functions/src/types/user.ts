import type { Timestamp } from '../utils/firebase';
import type { User as _User, UserDocumentData as _UserDocumentData, Claims, UserRole } from '@local/shared';

export type User = _User<Timestamp>;
export type UserDocumentData = _UserDocumentData<Timestamp>;
export type { Claims, UserRole };
