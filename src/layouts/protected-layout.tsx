import { Outlet } from "react-router-dom";

import SiteNavbar from "../components/shared/site-navbar";
import SiteFooter from "../components/shared/site-footer";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default ProtectedLayout;
