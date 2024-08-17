import { Outlet } from "react-router-dom";

import DashboardSidebar from "../components/shared/dashboard/dashboard-sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
