import { Outlet } from "react-router-dom";
import { Avatar, Input } from "antd";

import DashboardSidebar from "../components/shared/dashboard/dashboard-sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex flex-col py-3 px-6 w-full">
        <div className="h-12 flex items-center justify-center w-full space-x-6">
          <Input.Search placeholder="Search activity" />
          <div>
            <Avatar className="bg-primary">R</Avatar>
          </div>
        </div>
        <div className="h-[calc(100vh_-80px)] bg-white border rounded-lg overflow-auto p-5 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
