import { Link } from "react-router-dom";

import Logo from "../../ui/logo";
import SidebarDrawer from "./sidebar-drawer";
import AuthLinks from "./auth-links";

const MobileNavbar = () => {
  const isAuth = false;

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
