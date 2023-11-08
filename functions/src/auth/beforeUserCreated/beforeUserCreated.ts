import { createUser, userRef } from '../../models/user';
import { HttpsError, beforeUserCreated as _beforeUserCreated } from '../../utils/firebase';

export const beforeUserCreated = _beforeUserCreated(async (event) => {
  const user = event.data;
  if (event.eventType === 'providers/cloud.auth/eventTypes/user.beforeCreate:google.com')
    throw new HttpsError('unauthenticated', 'Unregistered user.');
  if (!user.email) throw new HttpsError('invalid-argument', 'Email is required.');

  await createUser(userRef(user.uid), { email: user.email, role: 'user' });

  return {
    ...user,
    customClaims: { role: 'user' },
  };
});
