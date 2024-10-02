import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
  const { isAuth } = useAuth();
  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="min-h-screen relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
