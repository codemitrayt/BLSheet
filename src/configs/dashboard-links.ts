import { NavLinkType } from "../types";

import { HiHome, HiTable } from "react-icons/hi";

const dashboardLinks: NavLinkType[] = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard/home",
    icon: HiHome,
  },
  {
    id: 2,
    title: "Sheet",
    path: "/dashboard/sheet",
    icon: HiTable,
  },
];

export default dashboardLinks;
