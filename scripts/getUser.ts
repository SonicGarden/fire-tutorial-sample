import { program } from 'commander';
import { getAuthUserByEmail, userRef } from './models/user';
import { getDocumentData, initializeApp } from './utils/firebase';

type Props = {
  email: string;
};

const run = async ({ email }: Props) => {
  if (!email) {
    console.error('Missing required arguments');
    return;
  }
  if (!(await initializeApp())) {
    console.error('Failed to initialize firebase');
    return;
  }

  const authUser = await getAuthUserByEmail(email);
  const firestoreUser = await getDocumentData(userRef(authUser.uid));

  console.info('');
  console.info('[auth]');
  console.info(JSON.stringify(authUser, null, 2));
  console.info('');
  console.info('[firestore]');
  console.info(JSON.stringify(firestoreUser.data, null, 2));
};

const options = program.option('--email <email>').parse(process.argv).opts() as Props;

run(options);
