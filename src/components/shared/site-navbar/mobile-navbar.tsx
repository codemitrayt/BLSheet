import { Link } from "react-router-dom";

import Logo from "../../ui/logo";
import AuthLinks from "./auth-links";
import SidebarDrawer from "./sidebar-drawer";
import useUserInfo from "../../../hooks/useUserInfo";

const MobileNavbar = () => {
  const { isAuth } = useUserInfo();

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
