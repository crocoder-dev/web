import type { PropsWithChildren } from "react";

type DrawerNavigationProperties = PropsWithChildren<{
  isOpen: boolean;
}>;

export const DrawerNavigation = ({ isOpen, children }: DrawerNavigationProperties) => {
  return (
    <aside aria-hidden={!isOpen} className="fixed bg-[#3C3843E5]">
      <nav>
        <ul>
          <li>

          </li>
        </ul>
      </nav>
      {children}
    </aside>
  );
};

