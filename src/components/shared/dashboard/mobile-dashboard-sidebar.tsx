import { Link, NavLink } from "react-router-dom";

import { GoHome } from "react-icons/go";

import Logo from "../../ui/logo";
import { cn } from "../../../utils";

const MobilDashboardSidebar = () => {
  return (
    <div className="md:hidden">
      <Link to="/">
        <Logo className="text-white" />
      </Link>

      <div className="flex items-center justify-center flex-col mt-8">
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            cn(
              "text-white hover:text-gray-300 transition p-2 rounded-md",
              isActive && "text-primary bg-white/80 hover:text-primary"
            )
          }
        >
          <GoHome className=" size-6" />
        </NavLink>
      </div>
    </div>
  );
};

export default MobilDashboardSidebar;
