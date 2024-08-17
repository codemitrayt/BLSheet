import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      <Outlet />
    </div>
  );
};

export default BaseLayout;
