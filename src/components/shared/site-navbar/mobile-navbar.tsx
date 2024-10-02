import { Link } from "react-router-dom";

import Logo from "../../ui/logo";
import AuthLinks from "./auth-links";
import SidebarDrawer from "./sidebar-drawer";
import useAuth from "../../../hooks/useAuth";

const MobileNavbar = () => {
  const { isAuth } = useAuth();

  return (
    <div className="flex items-center justify-between sm:hidden w-[90%]">
      <Link to="/">
        <Logo hasText={true} />
      </Link>
      {isAuth ? <SidebarDrawer /> : <AuthLinks />}
    </div>
  );
};

export default MobileNavbar;
