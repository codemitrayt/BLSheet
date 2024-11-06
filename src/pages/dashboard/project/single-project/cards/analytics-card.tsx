import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiTodoFill } from "react-icons/ri";
import { MdAssignmentInd } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import CountUp from "react-countup";

import { cn } from "../../../../../utils";
import { ProjectTaskStatus } from "../../../../../types";
import GridEffect from "../../../../../components/effects/grid-effect";

const IconMap = {
  todo: <RiTodoFill className="size-4 xl:size-6" />,
  in_progress: <MdAssignmentInd className="size-4 xl:size-6" />,
  completed: <IoIosCheckmarkCircle className="size-4 xl:size-6" />,
  under_review: <MdReviews className="size-4 xl:size-6" />,
};

const AnalyticsCard = ({
  title,
  status,
  count = 0,
}: {
  isLast?: boolean;
  title: string;
  status: ProjectTaskStatus;
  count?: number;
}) => {
  return (
    <div
      className={cn(
        "xl:h-[100px] flex text-gray-600 border rounded-md shadow-sm overflow-hidden"
      )}
    >
      <div className="relative w-full p-2">
        <GridEffect />
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-sm xl:text-md">{title}</h1>
          {IconMap[status]}
        </div>
        <div className="flex items-center justify-center">
          <h1 className="font-medium p-2 text-sm xl:text-3xl">
            <CountUp end={count} duration={4} />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
