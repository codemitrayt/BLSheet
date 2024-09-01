import { NavLinkType } from "../types";

import { HiHome, HiTable } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";

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
  { id: 3, title: "Todo", path: "/dashboard/todo", icon: IoIosCheckmarkCircle },
];

export default dashboardLinks;
