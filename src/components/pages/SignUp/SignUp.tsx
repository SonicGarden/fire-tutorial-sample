'use client';
import { Stack } from '@mantine/core';
import { SignUpForm } from '@/components/forms/auth/SignUpForm';

export const SignUp = () => {
  return (
    <Stack maw={500} mx='auto' py='lg'>
      <SignUpForm />
    </Stack>
  );
};
