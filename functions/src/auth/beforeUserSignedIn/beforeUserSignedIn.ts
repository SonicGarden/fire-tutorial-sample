import { HttpsError, beforeUserSignedIn as _beforeUserSignedIn } from '../../utils/firebase';

export const beforeUserSignedIn = _beforeUserSignedIn(async (event) => {
  const user = event.data;
  if (
    user.customClaims?.role !== 'admin' &&
    event.eventType === 'providers/cloud.auth/eventTypes/user.beforeSignIn:google.com'
  )
    throw new HttpsError('unauthenticated', 'Unauthorized user.');
});
