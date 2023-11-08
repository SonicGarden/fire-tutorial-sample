import { program } from 'commander';
import yesno from 'yesno';
import { createAdminUser } from './models/user';
import { initializeApp } from './utils/firebase';

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

  console.info('');
  console.info('[email]', email);
  console.info('');
  const ok = await yesno({
    question: '管理者アカウントを作成しますか？（y/n）',
  });
  if (!ok) {
    console.info('キャンセルしました');
    return;
  }

  await createAdminUser(email);
  console.info('管理者アカウントを作成しました');
};

const options = program.option('--email <email>').parse(process.argv).opts() as Props;

run(options);
