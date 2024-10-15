import { Button } from "antd";
import { format } from "date-fns";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { TbCalendarMonth } from "react-icons/tb";

interface CustomToolBar {
  date: Date;
  onNavigate: (action: "NEXT" | "PREV" | "TODAY") => void;
}

const CustomToolBar = ({ date, onNavigate }: CustomToolBar) => {
  return (
    <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start ">
      <Button icon={<LuChevronLeft />} onClick={() => onNavigate("PREV")} />
      <div className="flex items-center border rounded-s px-3 py-2 h-8 justify-center w-full lg:w-auto space-x-1">
        <TbCalendarMonth className="size-4" />
        <p className="text-sm">{format(date, "MMMM, yyyy")}</p>
      </div>
      <Button icon={<LuChevronRight />} onClick={() => onNavigate("NEXT")} />
    </div>
  );
};

export default CustomToolBar;
