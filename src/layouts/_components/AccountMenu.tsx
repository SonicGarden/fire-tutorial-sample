import { Avatar, Box, Group, NavLink, Text } from '@mantine/core';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { UnstyledConfirmButton } from '@/components/elements/ConfirmButton';
import { useAuth } from '@/contexts/auth';
import { signOut } from '@/utils/firebase/auth';
import { notify } from '@/utils/mantine/notifications';

export const AccountMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const handleConfirmSignOut = useCallback(async () => {
    await signOut();
    notify.info({
      message: 'サインアウトしました',
    });
  }, []);

  return (
    <Box aria-label='アカウントメニュー'>
      {currentUser ? (
        <>
          <NavLink
            label={
              <Group wrap='nowrap'>
                <Avatar size='sm' />
                <Text truncate='end'>{currentUser.email}</Text>
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
          <NavLink label='サインイン' onClick={() => router.push(`/sign-in?redirect=${pathname}`)}></NavLink>
          <NavLink label='サインアップ' onClick={() => router.push(`/sign-up?redirect=${pathname}`)}></NavLink>
        </>
      )}
    </Box>
  );
};
