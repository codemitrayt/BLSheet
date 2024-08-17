import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

import Logo from "../../ui/logo";
import SidebarDrawer from "./sidebar-drawer";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const handleClickSignIn = () => navigate("/auth/sign-in");
  const handleClickSignUp = () => navigate("/auth/sign-up");

  const isAuth = true;

  return (
    <div className="flex items-center justify-between sm:hidden w-[90%]">
      <Link to="/">
        <Logo hasText={true} />
      </Link>
      {isAuth ? (
        <SidebarDrawer />
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Button onClick={handleClickSignIn}>Sign In</Button>
          <Button onClick={handleClickSignUp} type="primary">
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
