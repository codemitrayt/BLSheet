import { GoProject } from "react-icons/go";
import { NavLinkType } from "../types";

import { HiHome, HiTable } from "react-icons/hi";
import { LuListTodo } from "react-icons/lu";
import { TbBulb } from "react-icons/tb";

const dashboardLinks: NavLinkType[] = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard/home",
    icon: HiHome,
  },
  {
    id: 2,
    title: "Sheets",
    path: "/dashboard/sheet",
    icon: HiTable,
  },
  { id: 3, title: "Todos", path: "/dashboard/todo", icon: LuListTodo },
  { id: 4, title: "Projects", path: "/dashboard/projects", icon: GoProject },
  { id: 5, title: "Ideas", path: "/dashboard/ideas", icon: TbBulb },
];

export default dashboardLinks;
