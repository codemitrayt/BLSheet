import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { Avatar } from "antd";

import DashboardContext from "../providers/dashboard-provider";
import useAuth from "../hooks/useAuth";
import { URLS } from "../constants";
import { cn } from "../utils";

import DashboardSidebar from "../components/shared/dashboard/dashboard-sidebar";
import LogoutButton from "../components/shared/logout-button";
import GuestAlert from "../components/shared/guest-alert";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const DashboardLayout = () => {
  const { isAuth, user } = useAuth();
  const [sidebarState, setSidebarState] = useState(true);
  const openSidebar = () => setSidebarState(true);
  const closeSidebar = () => setSidebarState(false);

  if (!isAuth) return <Navigate to={URLS.signInPageUrl} />;

  return (
    <DashboardContext.Provider
      value={{ sidebarState, openSidebar, closeSidebar }}
    >
      <div className="h-screen flex flex-row">
        {sidebarState && <DashboardSidebar />}

        <div
          className={cn(
            "flex flex-col w-[calc(100vw_-60px)] lg:w-[calc(100vw_-250px)]",
            !sidebarState && "w-full lg:w-full"
          )}
        >
          {/* Header */}
          <div className="h-12 flex items-center justify-between px-6 space-x-6 border-b">
            <div className="flex items-center justify-center space-x-2">
              <button
                className="flex items-center justify-center hover:text-primary/80 transition-all text-primary"
                onClick={() => setSidebarState((prev) => !prev)}
              >
                {!sidebarState ? (
                  <AiOutlineMenuUnfold className="size-5" />
                ) : (
                  <AiOutlineMenuFold className="size-5" />
                )}
              </button>
              <div className="flex items-center justify-center space-x-1">
                <Avatar className="bg-primary">
                  {user?.fullName[0].toUpperCase()}
                </Avatar>
                <span className="text-primary text-sm font-medium hidden md:block">
                  {user?.fullName}
                </span>
              </div>
            </div>

            <LogoutButton />
          </div>

          {/* content */}
          <div className="h-[calc(100vh_-48px)] p-5 bg-white">
            <GuestAlert />
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;
