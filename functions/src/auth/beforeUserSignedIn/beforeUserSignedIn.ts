import { HttpsError, beforeUserSignedIn as _beforeUserSignedIn } from '../../utils/firebase';

export const beforeUserSignedIn = _beforeUserSignedIn(async (event) => {
  const authUser = event.data;
  if (
    authUser.customClaims?.role !== 'admin' &&
    event.eventType === 'providers/cloud.auth/eventTypes/user.beforeSignedIn:google.com'
  )
    throw new HttpsError('unauthenticated', 'Unauthorized user.');
});
