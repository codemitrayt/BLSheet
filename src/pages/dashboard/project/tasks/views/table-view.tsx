import { Link } from "react-router-dom";
import { Avatar, Table, TableProps, Tag } from "antd";
import dateFormat from "dateformat";

import { capitalizeFirstLetter, cn } from "../../../../../utils";
import {
  ProjectTask,
  ProjectTaskPriority,
  ProjectTaskStatus,
} from "../../../../../types";
import {
  TASK_CARD_BG_COLOR,
  TASK_STATUS_DOT_COLOR,
} from "../../../../../constants";
import { TASK_TYPE_COLOR } from "../../../../../constants/task-type";

interface TableView {
  tasks: ProjectTask[];
  isHideFilters: boolean;
  refetch: () => void;
}

const columns: TableProps<ProjectTask>["columns"] = [
  {
    title: <div className="text-primary !w-[200px]">Title</div>,
    dataIndex: "title",
    key: "title",
    render: (title, task) => (
      <Link
        to={`/dashboard/projects/${task.projectId}/tasks/${task._id}`}
        className="text-primary font-medium hover:text-primary/80"
      >
        {title}
      </Link>
    ),
  },
  {
    title: (
      <div className="text-primary flex items-center justify-center">
        Task Type
      </div>
    ),
    dataIndex: "taskType",
    key: "taskType",
    render: (taskType) => (
      <Tag
        className="rounded-full px-3 w-[120px] flex items-center justify-center"
        color={TASK_TYPE_COLOR[taskType]}
      >
        {taskType}
      </Tag>
    ),
  },
  {
    title: (
      <div className="text-primary flex items-center justify-center">
        Status
      </div>
    ),
    dataIndex: "status",
    key: "status",
    render: (status: ProjectTaskStatus) => (
      <Tag
        className="rounded-full w-[90px] flex items-center justify-center"
        color={TASK_STATUS_DOT_COLOR[status]}
      >
        {capitalizeFirstLetter(status.split("_").join(" "))}
      </Tag>
    ),
  },
  {
    title: (
      <div className="text-primary !w-[180px] flex items-center justify-center">
        Creator
      </div>
    ),
    render: (_, task: ProjectTask) => (
      <div className="text-sm text-primary font-medium space-x-1 flex items-center justify-center">
        <Avatar className="bg-primary !text-xs" size={25}>
          {task.user?.fullName[0].toUpperCase()}
        </Avatar>
        <span>{task?.user?.fullName}</span>
      </div>
    ),
  },
  {
    title: (
      <div className="text-primary flex items-center justify-center w-[100px]">
        Assignee
      </div>
    ),
    render: (_, projectTask) => (
      <div className="flex items-center justify-center">
        {" "}
        {projectTask.assignedMembers.length === 0 ? (
          "Not Assigned"
        ) : (
          <Avatar.Group
            className="!text-xs !border-primary"
            max={{
              count: 2,
              style: { background: "#2F667F", border: "#2F667F" },
            }}
            size={25}
          >
            {projectTask.assignedMembers.map((member) => (
              <Avatar
                className="bg-primary !text-xs !border-primary"
                key={member._id}
              >
                {member.memberEmailId[0].toUpperCase()}
              </Avatar>
            ))}
          </Avatar.Group>
        )}
      </div>
    ),
  },
  {
    title: (
      <div className="text-primary flex items-center justify-center">
        Priority
      </div>
    ),
    dataIndex: "priority",
    key: "priority",
    render: (priority: ProjectTaskPriority) => (
      <div className="flex items-center justify-center">
        <Tag
          className="rounded-full w-[90px] flex items-center justify-center"
          color={TASK_CARD_BG_COLOR[priority]}
        >
          {capitalizeFirstLetter(priority)}
        </Tag>
      </div>
    ),
  },

  {
    title: <div className="text-primary text-center">Due Date</div>,
    dataIndex: "endDate",
    key: "endDate",
    render: (date) => (
      <div className="text-center">{dateFormat(date, "dd/mm/yyyy")}</div>
    ),
  },
];

const TableView = ({ tasks, isHideFilters }: TableView) => {
  return (
    <div
      className={cn(
        "p-2 h-[calc(100vh_-300px)] xl:h-[calc(100vh_-220px)] overflow-auto",
        isHideFilters && "h-[calc(100vh_-125px)]"
      )}
    >
      <Table
        rowKey="_id"
        bordered
        pagination={false}
        columns={columns}
        dataSource={tasks}
      />
    </div>
  );
};

export default TableView;
