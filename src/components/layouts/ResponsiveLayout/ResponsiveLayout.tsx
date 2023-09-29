import {
  AppShell,
  Burger,
  Divider,
  Group,
  NavLink as MantineNavLink,
  ScrollArea,
  createPolymorphicComponent,
} from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useMemo, type ReactNode, useCallback } from 'react';
import { ResponsiveLayoutContextProvider, useResponsiveLayoutContext } from './ResponsiveLayout.context';
import type { NavLinkProps } from '@mantine/core';
import type { MouseEvent } from 'react';

const HEADER_HEIGHT = 60;
const CONTENT_PADDING = 16;

export const ResponsiveLayout = ({
  children,
  header,
  navbar,
  main,
}: {
  children: ReactNode;
  header: { title: ReactNode; props?: Parameters<typeof AppShell.Header>[0] };
  navbar?: { navMenu: ReactNode; accountMenu?: ReactNode; props?: Parameters<typeof AppShell.Navbar>[0] };
  main?: { props?: Parameters<typeof AppShell.Main>[0] };
}) => {
  const [opened, { toggle }] = useDisclosure();
  const { height } = useViewportSize();
  const navbarValues = useMemo(() => ({ toggle }), [toggle]);
  const mainValues = useMemo(() => ({ height: height - HEADER_HEIGHT - CONTENT_PADDING * 2 }), [height]);

  return (
    <ResponsiveLayoutContextProvider value={{ navbar: navbarValues, main: mainValues }}>
      <AppShell
        header={{ height: HEADER_HEIGHT }}
        {...(navbar && {
          navbar: { width: { base: 200, md: 300, lg: 400 }, breakpoint: 'sm', collapsed: { mobile: !opened } },
        })}
        padding={CONTENT_PADDING}
      >
        <AppShell.Header {...header?.props}>
          <Group h='100%' px={CONTENT_PADDING}>
            {navbar && (
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom='sm'
                size='sm'
                aria-label='メニューボタン'
                {...(header.props?.c && { color: header.props.c as Parameters<typeof Burger>[0]['color'] })}
              />
            )}
            {header.title}
          </Group>
        </AppShell.Header>
        {navbar && (
          <AppShell.Navbar {...navbar?.props}>
            <AppShell.Section grow p={CONTENT_PADDING} component={ScrollArea}>
              {navbar.navMenu}
            </AppShell.Section>
            {navbar.accountMenu && (
              <>
                <Divider />
                <AppShell.Section p={CONTENT_PADDING}>{navbar.accountMenu}</AppShell.Section>
              </>
            )}
          </AppShell.Navbar>
        )}
        <AppShell.Main {...main?.props}>{children}</AppShell.Main>
      </AppShell>
    </ResponsiveLayoutContextProvider>
  );
};

const _NavLink = ({ onClick, ...props }: NavLinkProps) => {
  const {
    navbar: { toggle },
  } = useResponsiveLayoutContext();
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      toggle();
    },
    [toggle, onClick],
  );

  return <MantineNavLink {...props} onClick={handleClick} />;
};
export const NavLink = createPolymorphicComponent<'button', NavLinkProps, typeof _NavLink>(_NavLink);
ResponsiveLayout.NavLink = NavLink;
