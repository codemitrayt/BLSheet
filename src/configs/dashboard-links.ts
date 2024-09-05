import { NavLinkType } from "../types";

import { HiHome, HiTable } from "react-icons/hi";
import { LuListTodo } from "react-icons/lu";

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
  { id: 3, title: "Todo", path: "/dashboard/todo", icon: LuListTodo },
];

export default dashboardLinks;
