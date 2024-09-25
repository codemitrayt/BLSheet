import { Tag } from "antd";

import { ProjectTask } from "../../../../../types";
import { capitalizeFirstLetter, cn, strSlice } from "../../../../../utils";

const PROJECT_TASK_PRIORITY_BG_COLOR = {
  low: "green",
  medium: "orange",
  high: "red",
};

const PROJECT_TASK_STATUS_BG_COLOR = {
  todo: "#EBEBEB",
  in_progress: "#F45D2F",
  under_review: "#F5C330",
  completed: "#30F558",
};

const TaskCard = ({ task }: { task: ProjectTask }) => {
  return (
    <div
      key={task._id}
      className="grid grid-cols-3 md:grid-cols-4 xl:flex border-b border-gray-200 justify-between pb-3 w-full last:border-b-0"
    >
      <h1 className="text-primary text-sm hidden xl:block">
        {strSlice(task.title, 20)}
      </h1>

      <h1 className="text-primary text-sm xl:hidden">
        {strSlice(task.title, 25)}
      </h1>

      <div className="hidden md:block xl:hidden">
        {task.tags.map((t) => (
          <Tag className="rounded-full">{capitalizeFirstLetter(t)}</Tag>
        ))}
      </div>

      <div>
        <Tag
          color={PROJECT_TASK_STATUS_BG_COLOR[task.status] + "95"}
          className="w-[110px] flex items-center justify-center rounded-full !text-gray-800"
        >
          {task.status.split("_").join(" ").toUpperCase()}
        </Tag>
      </div>

      <div className="xl:hidden">
        <Tag
          color={PROJECT_TASK_PRIORITY_BG_COLOR[task.priority]}
          className="w-[110px] flex items-center justify-center rounded-full"
        >
          {task.priority}
        </Tag>
      </div>
    </div>
  );
};

export default TaskCard;
