import { useState } from "react";
import { Table, TableProps, Tag } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import RemoveMember from "./remove-member";
import projectService from "../../../../../services/project-service";
import ProjectMemberFilters from "../../../../../components/project-member-filters";

import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import useProjectMemberFilters from "../../../../../hooks/useProjectMemberFilters";

import { ProjectMember, ProjectMemberStatus } from "../../../../../types";

const perPage = 6;

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

const TeamMembersTable = ({ isAdmin }: TeamMembersTableProps) => {
  const { authToken } = useUserInfo();
  const { projectId } = useParams();
  const { handleError } = useErrorHandler();
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { memberEmail, setFilters, currentPage, memberStatus } =
    useProjectMemberFilters();

  const { isLoading, refetch: refetchProjectMembers } = useQuery({
    queryKey: ["project-members", memberEmail, memberStatus],
    queryFn: () =>
      projectService().getProjectMembers({
        data: { objectId: projectId },
        authToken,
        params: { memberEmail, status: memberStatus },
      }),
    onSuccess: ({ data }) => {
      const members = data?.message?.projectMembers || [];
      const count = data?.message?.totalCount;
      setMembers(members);
      setTotalCount(count);
    },
    onError: (error) => {
      console.error("ERROR :: project members ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="space-y-2 col-span-2">
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg w-full">
        <h1 className="text-primary text-lg font-medium">Team Members</h1>
        <ProjectMemberFilters />
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
        pagination={{
          total: totalCount,
          current: (currentPage as number) || 1,
          pageSize: perPage,
          onChange: (page) => {
            setFilters({ currentPage: page });
          },
        }}
        rowKey="_id"
        loading={isLoading}
      />
    </div>
  );
};

export default TeamMembersTable;
