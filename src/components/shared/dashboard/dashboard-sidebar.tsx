import DesktopDashboardSidebar from "./desktop-dashboard-sidebar";
import MobilDashboardSidebar from "./mobile-dashboard-sidebar";

const DashboardSidebar = () => {
  return (
    <div className="w-[100px] lg:w-[280px] py-8 pl-3">
      <div className="bg-primary h-full py-8 rounded-3xl w-full">
        <MobilDashboardSidebar />
        <DesktopDashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardSidebar;
