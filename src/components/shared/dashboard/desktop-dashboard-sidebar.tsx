import { Link, NavLink } from "react-router-dom";

import Logo from "../../ui/logo";
import { cn } from "../../../utils";
import dashboardLinks from "../../../configs/dashboard-links";

const DesktopDashboardSidebar = () => {
  return (
    <div className="hidden md:block">
      <Link to="/">
        <Logo className="text-white" hasText={true} />
      </Link>

      <div className="px-4 w-full flex space-y-6 items-center justify-center flex-col mt-8">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "border border-gray-300/80 w-full flex items-center space-x-1 text-white hover:bg-white/80 hover:text-primary transition-all p-2 rounded-md",
                isActive && "text-primary bg-white/80"
              )
            }
          >
            <link.icon className="size-6" />
            <span>{link.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DesktopDashboardSidebar;
