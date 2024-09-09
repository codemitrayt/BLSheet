import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "../../ui/logo";
import { cn } from "../../../utils";
import dashboardLinks from "../../../configs/dashboard-links";
import { logout } from "../../../store/slices/auth-slice";
import { AiOutlineLogout } from "react-icons/ai";

const MobilDashboardSidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <div className="lg:hidden">
      <Link to="/">
        <Logo className="text-white" />
      </Link>

      <div className="flex items-center h-[calc(100vh_-120px)] justify-between flex-col mt-8 space-y-6">
        <div className="flex items-center flex-col justify-center space-y-4">
          {dashboardLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex text-white items-center px-2 py-1 hover:bg-secondary transition-all rounded-lg",
                  isActive && "bg-secondary"
                )
              }
            >
              <link.icon className="size-6 text-white" />
            </NavLink>
          ))}
        </div>

        <div className="border-t pt-2">
          <button
            className="flex items-center px-2 py-1 hover:bg-secondary transition-all rounded-lg"
            onClick={handleLogout}
          >
            <AiOutlineLogout className="size-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilDashboardSidebar;
