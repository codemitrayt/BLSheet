import { Alert } from "antd";

import useAuth from "../../hooks/useAuth";
import { UserRole } from "../../types";

const GuestAlert = () => {
  const { user } = useAuth();
  if (user?.role !== UserRole.GUEST) return null;

  return (
    <div className="relative pb-2">
      <Alert
        type="warning"
        message="Guest Account - View Only Access: Features You Cannot Create, Update, or Delete"
        description="To Access All Features, Please Log In or Sign Up for Free"
      />
    </div>
  );
};

export default GuestAlert;
