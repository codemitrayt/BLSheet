import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="bg-gray-100 text-gray-900 overflow-hidden">
      <Outlet />
    </div>
  );
};

export default BaseLayout;
