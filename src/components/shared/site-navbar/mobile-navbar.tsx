import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../../ui/logo";
import SidebarDrawer from "./sidebar-drawer";
import AuthLinks from "./auth-links";
import { RootState } from "../../../store";

const MobileNavbar = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

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
