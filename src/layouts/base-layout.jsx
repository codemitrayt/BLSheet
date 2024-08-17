import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="bg-gray-100">
      <Outlet />
    </div>
  );
};

export default BaseLayout;
