import { NavLinkType } from "../types";

import { CgHome } from "react-icons/cg";
import { CiViewTable } from "react-icons/ci";

const dashboardLinks: NavLinkType[] = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard/home",
    icon: CgHome,
  },
  {
    id: 2,
    title: "Sheet",
    path: "/dashboard/sheet",
    icon: CiViewTable,
  },
];

export default dashboardLinks;
