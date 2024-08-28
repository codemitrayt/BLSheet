import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { URLS } from "../constants";
import authService from "../services/auth-service";
import useUserInfo from "../hooks/useUserInfo";
import useErrorHandler from "../hooks/useErrorHandler";
import { logout } from "../store/slices/auth-slice";
import { Spin } from "antd";

const VerifyLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  if (!isAuth) return <Navigate to={URLS.signInPageUrl} />;

  const { isLoading } = useQuery({
    queryKey: ["verify-user"],
    queryFn: () => authService().self({ data: { authToken } }),
    onError: (error) => {
      handleError(error);
      dispatch(logout());
      navigate(URLS.signInPageUrl);
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin />
      </div>
    );

  return <Outlet />;
};

export default VerifyLayout;
