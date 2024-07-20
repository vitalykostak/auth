import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from '@tanstack/react-router';
import { AppUrl } from '@/shared/types/router';
import { FC } from 'react';
import { useSessionRepository } from '@/entities/session';
import { useObservable } from '@/shared/lib/Observerable';

type NavigationItem = {
  label: string;
  url: AppUrl;
  'data-testid': string;
};

const navigationItems: NavigationItem[] = [
  { label: 'Main', url: '/', 'data-testid': 'widget__navbar_main_link' },
  { label: 'Auth', url: '/auth', 'data-testid': 'widget__navbar_auth_link' },
];

const navigationItemsLoggedIn: NavigationItem[] = [
  { label: 'Main', url: '/', 'data-testid': 'widget__navbar_main_link' },
];

export const Navbar = () => {
  const { getSessionObservable } = useSessionRepository();
  const { session } = useObservable(getSessionObservable());
  const items = Boolean(session) ? navigationItemsLoggedIn : navigationItems;

  return (
    <NavigationMenu.Root className="relative z-[1] flex justify-center">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
        {items.map((link) => (
          <NavItem key={link.url} {...link} />
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

const NavItem: FC<NavigationItem> = ({
  label,
  url,
  'data-testid': dataTestId,
}) => (
  <NavigationMenu.Item data-testid={dataTestId}>
    <Link to={url} className="hover:opacity-50" data-testid={dataTestId}>
      <NavigationMenu.Trigger
        data-testid={dataTestId}
        className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
      >
        <span data-testid={dataTestId}></span>
        {label}
      </NavigationMenu.Trigger>
    </Link>
  </NavigationMenu.Item>
);
