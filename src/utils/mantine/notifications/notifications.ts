import { notifications } from '@mantine/notifications';

const info = ({ message }: { message: string }) => {
  notifications.show({
    message,
  });
};

const error = ({ message }: { message: string }) => {
  notifications.show({
    message,
    color: 'red',
  });
};

export const notify = { info, error };
