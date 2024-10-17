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

interface TableView {
  tasks: ProjectTask[];
  isHideFilters: boolean;
  refetch: () => void;
}

const columns: TableProps<ProjectTask>["columns"] = [
  {
    title: <span className="text-primary">Title</span>,
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
    title: <span className="text-primary">Description</span>,
    dataIndex: "description",
    key: "description",
    render: (description) => <p className="w-[200px]">{description}</p>,
  },
  {
    title: <span className="text-primary">Status</span>,
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
    title: <span className="text-primary">Creator</span>,
    render: (_, task: ProjectTask) => (
      <span className="text-sm text-primary font-medium">
        {task?.user?.fullName}
      </span>
    ),
  },
  {
    title: <span className="text-primary">Assignee</span>,
    render: (_, projectTask) => (
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
    ),
  },
  {
    title: <span className="text-primary">Priority</span>,
    dataIndex: "priority",
    key: "priority",
    render: (priority: ProjectTaskPriority) => (
      <Tag
        className="rounded-full w-[90px] flex items-center justify-center"
        color={TASK_CARD_BG_COLOR[priority]}
      >
        {capitalizeFirstLetter(priority)}
      </Tag>
    ),
  },

  {
    title: <span className="text-primary">Due Date</span>,
    dataIndex: "endDate",
    key: "endDate",
    render: (date) => <span>{dateFormat(date, "dd/mm/yyyy")}</span>,
  },
];

const TableView = ({ tasks, isHideFilters }: TableView) => {
  return (
    <div
      className={cn(
        "p-2 h-[calc(100vh_-300px)] xl:h-[calc(100vh_-220px)] overflow-y-auto",
        isHideFilters && "h-[calc(100vh_-125px)]"
      )}
    >
      <Table
        rowKey="_id"
        bordered
        pagination={false}
        // pagination={{
        //   total: totalCount,
        //   current: currentPage || 1,
        //   pageSize: perPage,
        //   onChange: (page) => {
        //     setFilters({ currentPage: page });
        //   },
        // }}
        columns={columns}
        dataSource={tasks}
      />
    </div>
  );
};

export default TableView;
