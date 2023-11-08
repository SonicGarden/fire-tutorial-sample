import { createUser, userRef } from '../../models/user';
import { HttpsError, beforeUserCreated as _beforeUserCreated } from '../../utils/firebase';

export const beforeUserCreated = _beforeUserCreated(async (event) => {
  const user = event.data;
  if (!user.email) throw new HttpsError('invalid-argument', 'Email is required.');

  await createUser(userRef(user.uid), { email: user.email, role: 'user' });

  return {
    ...user,
    customClaims: { role: 'user' },
  };
});
