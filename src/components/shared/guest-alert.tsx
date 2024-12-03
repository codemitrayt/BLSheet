import { Alert } from "antd";

import useAuth from "../../hooks/useAuth";
import { UserRole } from "../../types";

const GuestAlert = () => {
  const { user } = useAuth();
  if (user?.role !== UserRole.GUEST) return null;

  return (
    <div className="relative pb-2">
      <Alert
        showIcon
        type="warning"
        message="Guest Account - View Only Access"
      />
    </div>
  );
};

export default GuestAlert;
