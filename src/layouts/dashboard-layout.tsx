import { Navigate, Outlet } from "react-router-dom";
import { Avatar } from "antd";

import DashboardSidebar from "../components/shared/dashboard/dashboard-sidebar";
import useAuth from "../hooks/useAuth";
import LogoutButton from "../components/shared/logout-button";
import { URLS } from "../constants";

const DashboardLayout = () => {
  const { isAuth, user } = useAuth();
  if (!isAuth) return <Navigate to={URLS.signInPageUrl} />;

  return (
    <div className="h-screen flex flex-row">
      <DashboardSidebar />

      <div className="flex flex-col w-[calc(100vw_-60px)] lg:w-[calc(100vw_-250px)]">
        {/* Header */}
        <div className="h-12 flex items-center justify-between px-6 space-x-6 border-b">
          {/* <div>
            <Input.Search
              className="max-w-sm sm:w-[300px]"
              placeholder="search sheets"
            />
          </div> */}
          <div className="flex items-center justify-center space-x-1">
            <Avatar className="bg-primary">
              {user?.fullName[0].toUpperCase()}
            </Avatar>
            <span className="text-primary text-sm font-medium hidden md:block">
              {user?.fullName}
            </span>
          </div>

          <LogoutButton />
        </div>

        {/* content */}
        <div className="h-[calc(100vh_-48px)] p-5 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
