import { Modal, UnstyledButton, createPolymorphicComponent } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { forwardRef } from 'react';
import type { ModalProps, UnstyledButtonProps } from '@mantine/core';
import type { ReactNode } from 'react';

type Props = UnstyledButtonProps & {
  modalContent: ({ opened, close }: { opened: boolean; close: () => void }) => ReactNode;
  modalProps?: Omit<ModalProps, 'opened' | 'onClose'>;
  children: ReactNode;
};

const _UnstyledModalButton = forwardRef<HTMLButtonElement, Props>(
  ({ modalContent, modalProps, children, ...props }: Props, ref) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <UnstyledButton {...props} ref={ref} onClick={open}>
          {children}
        </UnstyledButton>
        <Modal {...modalProps} opened={opened} onClose={close}>
          {modalContent({ opened, close })}
        </Modal>
      </>
    );
  },
);
_UnstyledModalButton.displayName = 'UnstyledModalButton';

export const UnstyledModalButton = createPolymorphicComponent<'button', Props, typeof _UnstyledModalButton>(
  _UnstyledModalButton,
);
