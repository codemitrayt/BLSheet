import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

const SiteNavbar = () => {
  return (
    <div className="h-[60px] flex items-center justify-center w-full border-b border-gray-300">
      <MobileNavbar />
      <DesktopNavbar />
    </div>
  );
};

export default SiteNavbar;
