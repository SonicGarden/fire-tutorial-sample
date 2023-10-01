import { Avatar, Box, Group, NavLink, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { UnstyledConfirmButton } from '@/components/elements/ConfirmButton';
import { useAuth } from '@/contexts/auth';
import { signOut } from '@/utils/firebase/auth';
import { notify } from '@/utils/mantine/notifications';

export const AccountMenu = () => {
  const router = useRouter();
  const { firebaseUser } = useAuth();
  const handleConfirmSignOut = useCallback(async () => {
    await signOut();
    notify.info({
      message: 'サインアウトしました',
    });
  }, []);

  return (
    <Box aria-label='アカウントメニュー'>
      {firebaseUser ? (
        <>
          <NavLink
            label={
              <Group>
                <Avatar size='sm' />
                <Text>{firebaseUser.email}</Text>
              </Group>
            }
          >
            <NavLink
              label='サインアウト'
              component={UnstyledConfirmButton}
              message='本当にサインアウトしますか？'
              onConfirm={handleConfirmSignOut}
            />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink label='サインイン'></NavLink>
          <NavLink
            label='サインアップ'
            onClick={() => router.push({ pathname: '/sign-up', query: { redirect: router.asPath } })}
          ></NavLink>
        </>
      )}
    </Box>
  );
};
