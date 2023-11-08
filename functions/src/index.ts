import { auth as _auth } from './auth';

process.env.TZ = 'Asia/Tokyo';

export const auth = { ..._auth };
