import DesktopDashboardSidebar from "./desktop-dashboard-sidebar";
import MobilDashboardSidebar from "./mobile-dashboard-sidebar";

const DashboardSidebar = () => {
  return (
    <div className="w-[130px] lg:w-[300px] py-3 pl-3">
      <div className="bg-primary h-full py-8 rounded-3xl">
        <MobilDashboardSidebar />
        <DesktopDashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardSidebar;
