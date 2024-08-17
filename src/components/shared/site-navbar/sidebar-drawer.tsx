import { Button, Drawer } from "antd";
import { useState } from "react";

import { FiMenu } from "react-icons/fi";
import { LuChevronLeftCircle } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";

import NavItem from "./nav-item";
import siteConfig from "../../../configs/site-config";
import navbarLinks from "../../../configs/navbar-links";

const SidebarDrawer = () => {
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div className="relative">
      <Button icon={<FiMenu />} onClick={onOpenDrawer} />

      <Drawer
        width={300}
        placement="left"
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-blue-500 text-lg">{siteConfig.name}</span>}
        closeIcon={<LuChevronLeftCircle className="size-6 text-blue-500" />}
      >
        <div className="flex items-center flex-col justify-between w-full h-full">
          <div className="space-y-2 w-full">
            {navbarLinks
              .filter((link) => link.onyForDesktop)
              .map((link) => (
                <NavItem
                  link={link}
                  onCloseDrawer={onCloseDrawer}
                  key={link.id}
                />
              ))}
          </div>

          <div className="space-y-2 w-full border-t pt-3">
            {navbarLinks
              .filter((link) => !link.onyForDesktop)
              .map((link) => (
                <NavItem
                  link={link}
                  onCloseDrawer={onCloseDrawer}
                  key={link.id}
                />
              ))}

            <button className="w-full px-3 py-2 rounded-lg group flex items-center space-x-2 hover:bg-gray-100 transition border border-gray-300/30">
              <AiOutlineLogout className="size-5 group-hover:text-primary transition" />
              <span className="text-[16px] group-hover:text-primary transition">
                Logout
              </span>
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SidebarDrawer;
