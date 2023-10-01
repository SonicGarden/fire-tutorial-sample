import { Avatar, Box, Group, NavLink, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/auth';

export const AccountMenu = () => {
  const router = useRouter();
  const { firebaseUser } = useAuth();

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
            <NavLink label='サインアウト' />
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
