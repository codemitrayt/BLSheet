import { Navigate, Outlet } from "react-router-dom";

import useUserInfo from "../hooks/useUserInfo";
import { URLS } from "../constants";

const AuthLayout = () => {
  const { isAuth } = useUserInfo();
  if (isAuth) return <Navigate to={URLS.dashboardHomeUrl} />;

  return (
    <div className="min-h-screen relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
