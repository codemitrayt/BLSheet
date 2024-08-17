import { Button, Drawer } from "antd";
import { useState } from "react";

import { FiMenu } from "react-icons/fi";
import { LuChevronLeftCircle } from "react-icons/lu";

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
        <div className="space-y-2">
          {navbarLinks.map((link) => (
            <NavItem link={link} onCloseDrawer={onCloseDrawer} key={link.id} />
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default SidebarDrawer;
