import { Button, LoadingOverlay, createPolymorphicComponent } from '@mantine/core';
import { forwardRef } from 'react';
import type { ButtonProps } from '@mantine/core';

type Props = ButtonProps;

const _LoadingOverlayButton = forwardRef<HTMLButtonElement, Props>(({ loading, children, ...props }: Props, ref) => {
  return (
    <>
      <LoadingOverlay visible={loading} />
      <Button {...props} disabled={loading} ref={ref}>
        {children}
      </Button>
    </>
  );
});
_LoadingOverlayButton.displayName = 'LoadingOverlayButton';

export const LoadingOverlayButton = createPolymorphicComponent<'button', Props, typeof _LoadingOverlayButton>(
  _LoadingOverlayButton,
);
