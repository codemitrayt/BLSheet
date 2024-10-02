import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Spin } from "antd";

import { URLS } from "../constants";
import authService from "../services/auth-service";
import useAuth from "../hooks/useAuth";
import useErrorHandler from "../hooks/useErrorHandler";
import { logout } from "../store/slices/auth-slice";

const VerifyLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const { isLoading } = useQuery({
    queryKey: ["verify-user"],
    queryFn: () => authService().self({ data: { authToken }, authToken }),
    onError: (error) => {
      handleError(error);
      dispatch(logout());
      navigate(URLS.signInPageUrl);
    },
    staleTime: 20 * 60 * 60 * 1000,
    retry: false,
  });

  if (!isAuth) return <Navigate to={URLS.signInPageUrl} />;

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin />
      </div>
    );

  return <Outlet />;
};

export default VerifyLayout;
