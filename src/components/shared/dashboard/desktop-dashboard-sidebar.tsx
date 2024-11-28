import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "../../ui/logo";
import { capitalizeFirstLetter, cn } from "../../../utils";

import dashboardLinks from "../../../configs/dashboard-links";
import { logout } from "../../../store/slices/auth-slice";

import { AiOutlineLogout } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import { PricingModel } from "../../../types";

const DesktopDashboardSidebar = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-start px-6">
        <Link to="/">
          <Logo className="text-white text-2xl" hasText={true} />
        </Link>
      </div>

      <div className="px-4 h-[calc(100vh_-120px)] w-full  mt-8 flex justify-between flex-col">
        <div className="flex space-y-1 items-center flex-col justify-center">
          {dashboardLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex text-white items-center px-4 py-3 hover:bg-secondary transition-all rounded-lg w-full",
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

        <div>
          <div className="bg-secondary rounded-md px-2 py-3">
            <h1 className="font-semibold text-white">
              {capitalizeFirstLetter(user?.pricingModel as string)} Plan
            </h1>
            <ul className="ml-6 list-disc text-sm text-gray-100 mt-2">
              <li>
                {user?.pricingModel === PricingModel.FREE
                  ? 1
                  : user?.pricingModel === PricingModel.PREMIUM
                  ? 10
                  : 25}{" "}
                Project
              </li>
              <li>
                {user?.pricingModel === PricingModel.FREE
                  ? 5
                  : user?.pricingModel === PricingModel.PREMIUM
                  ? 30
                  : 150}{" "}
                Members
              </li>
            </ul>
          </div>

          <div className="border-t pt-2 mt-4">
            <button
              className="flex items-center px-4 py-3 hover:bg-secondary transition-all rounded-lg w-full"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="size-6 text-white" />
              <span className="text-lg text-white pl-4 font-light tracking-wider">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboardSidebar;
