import { UnstyledButton, createPolymorphicComponent } from '@mantine/core';
import { useCallback, forwardRef } from 'react';
import { confirm } from '@/utils/mantine/modals';
import type { UnstyledButtonProps } from '@mantine/core';
import type { ReactNode } from 'react';

type Props = UnstyledButtonProps & {
  title?: Parameters<typeof confirm>[0]['title'];
  message: Parameters<typeof confirm>[0]['message'];
  onConfirm: Parameters<typeof confirm>[0]['onConfirm'];
  children: ReactNode;
};

const _UnstyledConfirmButton = forwardRef<HTMLButtonElement, Props>(
  ({ title, message, onConfirm, children, ...props }: Props, ref) => {
    const handleClick = useCallback(() => {
      confirm({ title, message, onConfirm });
    }, [title, message, onConfirm]);

    return (
      <UnstyledButton {...props} ref={ref} onClick={handleClick}>
        {children}
      </UnstyledButton>
    );
  },
);
_UnstyledConfirmButton.displayName = 'UnstyledConfirmButton';

export const UnstyledConfirmButton = createPolymorphicComponent<'button', Props, typeof _UnstyledConfirmButton>(
  _UnstyledConfirmButton,
);
