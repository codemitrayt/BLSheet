import { NavLink } from "react-router-dom";

import { NavLinkType } from "../../../types";
import { cn } from "../../../utils";

interface NavItemProps {
  link: NavLinkType;
  onCloseDrawer: () => void;
}

const NavItem = ({ link, onCloseDrawer }: NavItemProps) => {
  return (
    <NavLink
      key={link.id}
      onClick={onCloseDrawer}
      to={link.path}
      className={(isActive) =>
        cn(
          "w-full px-3 py-1 rounded-lg group flex items-center space-x-2 hover:bg-gray-100 transition",
          isActive && "bg-gray-100 text-primary"
        )
      }
    >
      <link.icon className="size-5 group-hover:text-primary transition" />
      <span className="text-[16px] group-hover:text-primary transition">
        {link.title}
      </span>
    </NavLink>
  );
};

export default NavItem;
