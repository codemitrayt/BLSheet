import { Input, Table, TableProps, Tag } from "antd";
import { ProjectMember, ProjectMemberStatus } from "../../../../../types";
import RemoveMember from "./remove-member";

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
    render: (status, { isAdmin }) => (
      <>
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
        {isAdmin && <Tag color="gold">Admin</Tag>}
      </>
    ),
  },
];

interface TeamMembersTableProps {
  isAdmin: Boolean;
  members: ProjectMember[];
  isLoading: boolean;
  refetchProjectMembers: () => {};
}

const TeamMembersTable = ({
  isAdmin,
  members,
  isLoading,
  refetchProjectMembers,
}: TeamMembersTableProps) => {
  return (
    <div className="space-y-2 col-span-2">
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg w-full">
        <h1 className="text-primary text-lg font-medium">Team Members</h1>
        <Input.Search placeholder="Search user" className="max-w-[300px]" />
      </div>
      <Table
        bordered
        dataSource={members}
        columns={[
          ...columns,
          ...(isAdmin
            ? [
                {
                  title: <span className="text-primary">Actions</span>,
                  dataIndex: "actions",
                  key: "actions",
                  render: (_: string, member: ProjectMember) => {
                    if (member.isAdmin) return <span>No action for admin</span>;
                    return (
                      <RemoveMember
                        projectMember={member}
                        refetchProjectMembers={refetchProjectMembers}
                      />
                    );
                  },
                },
              ]
            : []),
        ]}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        loading={isLoading}
      />
    </div>
  );
};

export default TeamMembersTable;
