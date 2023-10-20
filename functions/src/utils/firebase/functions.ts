import { https, logger } from 'firebase-functions/v2';
import {
  beforeUserCreated as _beforeUserCreated,
  beforeUserSignedIn as _beforeUserSignedIn,
  HttpsError,
} from 'firebase-functions/v2/identity';
import type { BlockingOptions } from 'firebase-functions/v2/identity';

const defaultRegion = 'asia-northeast1';

type BeforeUserCreatedHandler = Parameters<typeof _beforeUserCreated>[1];
const beforeUserCreated = (
  optsOrHandler: BlockingOptions | BeforeUserCreatedHandler,
  _handler?: BeforeUserCreatedHandler,
) => {
  const handler = _handler ?? (optsOrHandler as BeforeUserCreatedHandler);
  return _beforeUserCreated({ region: defaultRegion, memory: '1GiB', ...optsOrHandler }, handler);
};

type BeforeUserSignedInHandler = Parameters<typeof _beforeUserSignedIn>[1];
const beforeUserSignedIn = (
  optsOrHandler: BlockingOptions | BeforeUserSignedInHandler,
  _handler?: BeforeUserSignedInHandler,
) => {
  const handler = _handler ?? (optsOrHandler as BeforeUserSignedInHandler);
  return _beforeUserSignedIn({ region: defaultRegion, memory: '1GiB', ...optsOrHandler }, handler);
};

export { beforeUserCreated, beforeUserSignedIn, https, logger, HttpsError };
