import { GoProject } from "react-icons/go";
import { NavLinkType } from "../types";

import { HiHome, HiTable } from "react-icons/hi";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineTaskAlt } from "react-icons/md";

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
  { id: 3, title: "Projects", path: "/dashboard/projects", icon: GoProject },
  { id: 3, title: "Tasks", path: "/dashboard/tasks", icon: MdOutlineTaskAlt },
];

export default dashboardLinks;
