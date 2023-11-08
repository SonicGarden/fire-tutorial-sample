import { Center } from '@mantine/core';
import { SignInWithGoogleForm } from '@/components/forms/auth/SignInWithGoogleForm';

export const AdminSignIn = () => {
  return (
    <Center py='lg'>
      <SignInWithGoogleForm />
    </Center>
  );
};
