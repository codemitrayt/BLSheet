import { Link, NavLink } from "react-router-dom";

import { GoHome } from "react-icons/go";

import Logo from "../../ui/logo";
import { cn } from "../../../utils";

const DesktopDashboardSidebar = () => {
  return (
    <div className="hidden md:block">
      <div>
        <Link to="/">
          <Logo className="text-white" hasText={true} />
        </Link>
      </div>

      <div className="px-4 w-full flex items-center justify-center flex-col mt-8">
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            cn(
              "border border-gray-300/80 w-full flex items-center space-x-1 text-white hover:bg-white/80 hover:text-primary transition-all p-2 rounded-md",
              isActive && "text-primary bg-white/80"
            )
          }
        >
          <GoHome className=" size-6" />
          <span>Home</span>
        </NavLink>
      </div>
    </div>
  );
};

export default DesktopDashboardSidebar;
