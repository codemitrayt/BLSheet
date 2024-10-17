import { Badge, Tag } from "antd";
import dateFormat from "dateformat";

import { ProjectTask } from "../../../../../types";
import {
  capitalizeFirstLetter,
  cn,
  getDueDateColor,
} from "../../../../../utils";

const PROJECT_TASK_PRIORITY_BG_COLOR = {
  low: "green",
  medium: "orange",
  high: "red",
};

const PROJECT_TASK_STATUS_BG_COLOR = {
  todo: "#6F6F6F",
  in_progress: "#F45D2F",
  under_review: "#F5C330",
  completed: "#30F558",
};

const TaskCard = ({ task }: { task: ProjectTask }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center  p-3 bg-turnary md:space-x-3 border-b border-gray-200 md:justify-between last:border-b-0">
      <div className="flex space-x-1 md:hidden">
        <Badge
          color={PROJECT_TASK_STATUS_BG_COLOR[task.status]}
          className="flex items-start justify-start pt-1.5"
        />
        <h1 className="text-primary text-xs md:text-sm">{task.title}</h1>
      </div>

      <div className="w-full">
        <h1 className="text-primary text-xs md:text-sm hidden md:block">
          {task.title}
        </h1>
      </div>

      <div className="flex items-center justify-between md:justify-end w-full md:space-x-2">
        <Badge
          color={PROJECT_TASK_STATUS_BG_COLOR[task.status]}
          className="hidden md:block"
        />

        <div
          className={
            (cn("flex items-center text-xs"), getDueDateColor(task.endDate))
          }
        >
          <span className="text-xs">
            {dateFormat(task.endDate, "dd/mm/yyyy")}
          </span>
        </div>
        <div>
          <Tag
            color={PROJECT_TASK_PRIORITY_BG_COLOR[task.priority]}
            className="w-[60px] text-xs flex items-center justify-center rounded-full"
          >
            {capitalizeFirstLetter(task.priority)}
          </Tag>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
