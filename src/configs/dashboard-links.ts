import { GoProject } from "react-icons/go";
import { HiHome, HiTable } from "react-icons/hi";
import { LuListTodo } from "react-icons/lu";

import { NavLinkType } from "../types";

const dashboardLinks: NavLinkType[] = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard/home",
    icon: HiHome,
  },
  { id: 4, title: "Projects", path: "/dashboard/projects", icon: GoProject },
  { id: 3, title: "Todos", path: "/dashboard/todo", icon: LuListTodo },
  {
    id: 2,
    title: "Sheets",
    path: "/dashboard/sheet",
    icon: HiTable,
  },
];

export default dashboardLinks;
