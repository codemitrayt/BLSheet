import { Link, NavLink } from "react-router-dom";

import Logo from "../../ui/logo";
import { cn } from "../../../utils";
import dashboardLinks from "../../../configs/dashboard-links";

const DesktopDashboardSidebar = () => {
  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-start px-6">
        <Link to="/">
          <Logo className="text-white text-4xl" hasText={true} />
        </Link>
      </div>

      <div className="px-4 w-full flex space-y-1 items-center justify-center flex-col mt-8">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 hover:bg-secondary transition-all rounded-lg w-full",
                isActive && "bg-secondary"
              )
            }
          >
            <link.icon className="size-6 text-white" />
            <span className="pl-4 text-lg text-white font-light tracking-wider">
              {link.title}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DesktopDashboardSidebar;
