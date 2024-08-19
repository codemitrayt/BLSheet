import { Input } from "antd";

import CreateSheet from "./helpers/create";
import Show from "./helpers/show";

const DashboardSheetPage = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between space-x-4">
        <Input.Search placeholder="search sheet" className="max-w-sm" />
        <CreateSheet />
      </div>
      <div className="mt-6 overflow-x-auto">
        <Show />
      </div>
    </div>
  );
};

export default DashboardSheetPage;
