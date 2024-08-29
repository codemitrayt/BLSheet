import { Link, NavLink } from "react-router-dom";

import Logo from "../../ui/logo";
import { cn } from "../../../utils";
import dashboardLinks from "../../../configs/dashboard-links";

const MobilDashboardSidebar = () => {
  return (
    <div className="lg:hidden">
      <Link to="/">
        <Logo className="text-white" />
      </Link>

      <div className="flex items-center justify-center flex-col mt-8 space-y-6">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-2 py-1 hover:bg-secondary transition-all rounded-lg",
                isActive && "bg-secondary"
              )
            }
          >
            <link.icon className="size-6 text-white" />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobilDashboardSidebar;
