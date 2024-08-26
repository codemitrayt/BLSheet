import { Navigate, Outlet } from "react-router-dom";

import SiteNavbar from "../components/shared/site-navbar";
import SiteFooter from "../components/shared/site-footer";
import useUserInfo from "../hooks/useUserInfo";
import { URLS } from "../constants";

const ProtectedLayout = () => {
  const { isAuth } = useUserInfo();
  if (!isAuth) return <Navigate to={URLS.signInPageUrl} />;

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
