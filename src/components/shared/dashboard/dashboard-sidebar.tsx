import DesktopDashboardSidebar from "./desktop-dashboard-sidebar";
import MobilDashboardSidebar from "./mobile-dashboard-sidebar";

const DashboardSidebar = () => {
  return (
    <div className="w-[100px] md:w-[300px] p-3">
      <div className="bg-primary/70 h-full rounded-2xl py-8">
        <MobilDashboardSidebar />
        <DesktopDashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardSidebar;
