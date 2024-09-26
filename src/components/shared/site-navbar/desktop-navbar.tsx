import { Link, NavLink } from "react-router-dom";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useDispatch } from "react-redux";

import { cn } from "../../../utils";
import { NavLinkType } from "../../../types";
import navbarLinks from "../../../configs/navbar-links";

import Logo from "../../ui/logo";
import AuthLinks from "./auth-links";

import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

import useUserInfo from "../../../hooks/useUserInfo";
import { logout } from "../../../store/slices/auth-slice";
import GithubStar from "../github-star";

const DesktopNavbar = () => {
  const { isAuth } = useUserInfo();

  return (
    <div className="hidden sm:flex items-center w-[90%]">
      {isAuth ? <AuthorizedNavbar /> : <UnAuthorizedNavbar />}
    </div>
  );
};

const UnAuthorizedNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <Link to="/">
        <Logo hasText={true} />
      </Link>
      <AuthLinks />
    </div>
  );
};

const AuthorizedNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-center space-x-12">
        <Link to="/">
          <Logo hasText={true} />
        </Link>

        <div className="flex items-center justify-center space-x-4">
          {navbarLinks
            .filter((link) => link.onyForDesktop)
            .map((link) => (
              <NavItem key={link.id} link={link} />
            ))}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <UserDropdown />
        <div className="h-12 w-[0.1px] border-l border-primary/20"></div>
        <GithubStar />
      </div>
    </div>
  );
};

const NavItem = ({ link }: { link: NavLinkType }) => {
  return (
    <NavLink
      key={link.id}
      to={link.path}
      className={({ isActive }) =>
        cn(
          "group text-gray-900 hover:text-primary transition flex items-center justify-center space-x-1",
          isActive && "text-primary"
        )
      }
    >
      <span className="text-sm">{link.title}</span>
    </NavLink>
  );
};

const UserDropdown = () => {
  const { user } = useUserInfo();
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Link to="profile" className="space-x-1 flex items-center">
          <CgProfile />
          <span>Profile</span>
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <button className="flex items-center space-x-1" onClick={handleLogout}>
          <AiOutlineLogout />
          <span>Logout</span>
        </button>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      className="cursor-pointer"
    >
      <div className="flex items-center justify-center space-x-1">
        <Avatar className="bg-primary">
          {user?.fullName[0].toUpperCase()}
        </Avatar>
        <span className="text-primary text-sm font-medium">
          {user?.fullName}
        </span>
      </div>
    </Dropdown>
  );
};

export default DesktopNavbar;
