import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import { NavLinkType } from "../types";

const navbarLinks: NavLinkType[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    icon: GoHome,
    onyForDesktop: true,
  },
  {
    id: 2,
    title: "Profile",
    path: "/dashboard/profile",
    icon: CgProfile,
    onyForDesktop: false,
  },
  {
    id: 2,
    title: "Dashboard",
    path: "/dashboard/projects",
    icon: MdOutlineSpaceDashboard,
    onyForDesktop: true,
  },
];

export default navbarLinks;
