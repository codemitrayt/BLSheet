import dateFormat from "dateformat";
import { TiTime } from "react-icons/ti";
import { Tag } from "antd";

import { cn, getDueDateColor } from "../../../../../../utils";
import { ProjectTaskStatus } from "../../../../../../types";
import { TASK_TYPE_COLOR } from "../../../../../../constants/task-type";

interface TaskHeaderProps {
  title: string;
  dueDate: Date;
  status: ProjectTaskStatus;
  taskType: string;
  taskNumber: number;
}

const ProjectTaskStatusColor = {
  [ProjectTaskStatus.TODO]: "red",
  [ProjectTaskStatus.IN_PROGRESS]: "blue",
  [ProjectTaskStatus.UNDER_REVIEW]: "gold",
  [ProjectTaskStatus.COMPLETED]: "green",
};

const StatusMap = {
  [ProjectTaskStatus.TODO]: "To Do",
  [ProjectTaskStatus.IN_PROGRESS]: "In Progress",
  [ProjectTaskStatus.UNDER_REVIEW]: "Under Review",
  [ProjectTaskStatus.COMPLETED]: "Completed",
};

const TaskHeader = ({
  taskNumber,
  taskType,
  title,
  dueDate,
  status,
}: TaskHeaderProps) => {
  return (
    <div className="border-b pb-2 border-primary">
      <div className="flex space-y-1 sm:space-y-0 sm:items-center sm:justify-between flex-col sm:flex-row">
        <div className="flex items-center space-x-2">
          <Tag className="rounded-full px-3" color={TASK_TYPE_COLOR[taskType]}>
            {taskType}
          </Tag>

          <Tag className="rounded-full px-3">Task #{taskNumber}</Tag>
        </div>

        <div
          className={
            (cn("flex items-center space-x-1"), getDueDateColor(dueDate))
          }
        >
          <div className="flex space-x-1 text-sm items-center">
            <TiTime />
            <span className="text-sm">Due date:</span>
            <span className="text-sm">{dateFormat(dueDate, "dd/mm/yyyy")}</span>
          </div>
        </div>
      </div>

      <div className="flex sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 my-2 flex-col sm:flex-row">
        <h1 className="text-primary font-medium text-lg">{title}</h1>
        <div>
          <Tag color={ProjectTaskStatusColor[status]}>{StatusMap[status]}</Tag>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
