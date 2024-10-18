import { createContext, useContext } from "react";

interface DashboardProvider {
  sidebarState: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const DashboardContext = createContext<DashboardProvider>({
  sidebarState: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("Dashboard context not found");
  return context;
};

export default DashboardContext;
