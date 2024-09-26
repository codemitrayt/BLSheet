import { Tooltip } from "antd";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";

import { logout } from "../../store/slices/auth-slice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <Tooltip title="Logout Account">
      <button
        onClick={logoutUser}
        className="text-primary border border-primary/80 transition-all rounded-full size-7 shadow-sm flex items-center justify-center"
      >
        <IoMdLogOut className="size-4" />
      </button>
    </Tooltip>
  );
};

export default LogoutButton;
