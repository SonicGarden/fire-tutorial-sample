import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { StorageReference, UploadMetadata } from 'firebase/storage';

export type { StorageReference, UploadMetadata };
export { getStorage, ref, uploadBytes, getDownloadURL, deleteObject };
