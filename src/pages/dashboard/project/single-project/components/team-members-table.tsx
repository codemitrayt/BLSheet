import { Input, Table, TableProps, Tag } from "antd";
import { ProjectMember, ProjectMemberStatus } from "../../../../../types";

const columns: TableProps<ProjectMember>["columns"] = [
  {
    title: <span className="text-primary">Email</span>,
    dataIndex: "memberEmailId",
    key: "memberEmailId",
  },
  {
    title: <span className="text-primary">Status</span>,
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag
        color={
          status === ProjectMemberStatus.ACCEPTED
            ? "green"
            : status === ProjectMemberStatus.PENDING
            ? "red"
            : "orange"
        }
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: <span className="text-primary">Actions</span>,
    dataIndex: "actions",
    key: "actions",
    render: () => {
      return <div>Actions</div>;
    },
  },
];

interface TeamMembersTableProps {
  members: ProjectMember[];
  isLoading: boolean;
  refetchProjectMembers: () => {};
}

const TeamMembersTable = ({ members, isLoading }: TeamMembersTableProps) => {
  return (
    <div className="space-y-2 col-span-2">
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg w-full">
        <h1 className="text-primary text-lg font-medium">Team Members</h1>
        <Input.Search
          size="small"
          placeholder="Search user"
          className="w-[200px]"
        />
      </div>
      <Table
        bordered
        dataSource={members}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        loading={isLoading}
      />
    </div>
  );
};

export default TeamMembersTable;
