import { Navigate, Outlet } from "react-router-dom";

import useUserInfo from "../hooks/useUserInfo";

const AuthLayout = () => {
  const { isAuth } = useUserInfo();
  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="min-h-screen relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
