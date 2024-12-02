import { useState } from "react";
import { Avatar, Pagination, Table, TableProps, Tag } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import RemoveMember from "../../single-project/components/remove-member";
import projectService from "../../../../../services/project-service";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import useProjectMemberFilters from "../../../../../hooks/useProjectMemberFilters";

import {
  MemberRoles,
  ProjectMember,
  ProjectMemberStatus,
  UserRole,
} from "../../../../../types";
import { useProjectContext } from "../../../../../providers/project-provider";
import { RoleColorMap } from "../../../../../constants";
import { capitalizeFirstLetter } from "../../../../../utils";
import UpdateMember from "./update-member";

const perPage = 6;

const columns: TableProps<ProjectMember>["columns"] = [
  {
    title: <span className="text-primary">Full Name</span>,
    dataIndex: "user.fullName",
    key: "fullName",
    render: (_, { user }) => (
      <div className="flex items-center space-x-2 text-xs md:text-sm w-[250px]">
        <Avatar size={25} className="bg-primary" src={user.avatar?.url}>
          {user.fullName[0].toUpperCase()}
        </Avatar>{" "}
        <span>{user.fullName}</span>
      </div>
    ),
  },
  {
    title: <span className="text-primary">Email</span>,
    dataIndex: "memberEmailId",
    key: "memberEmailId",
    render: (memberEmailId) => (
      <div className="text-xs md:text-sm w-[250px]">{memberEmailId}</div>
    ),
  },
  {
    title: <span className="text-primary">Role</span>,
    key: "role",
    dataIndex: "role",
    render: (role: MemberRoles) => {
      return (
        <Tag
          color={RoleColorMap[role ?? "member"]}
          className="w-[100px] flex items-center justify-center"
        >
          {capitalizeFirstLetter(role ? role : "Member")}
        </Tag>
      );
    },
  },
  {
    title: <span className="text-primary">Status</span>,
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <>
        <Tag
          className="w-[100px] flex items-center justify-center"
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
      </>
    ),
  },
];

const TeamMembersTable = () => {
  const { project } = useProjectContext();
  const { authToken, user } = useAuth();
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
    <div className="overflow-auto">
      <Table
        bordered
        dataSource={members}
        columns={[
          ...columns,
          ...(project?.role === MemberRoles.OWNER &&
          user?.role !== UserRole.GUEST
            ? [
                {
                  title: <span className="text-primary">Actions</span>,
                  dataIndex: "actions",
                  key: "actions",
                  render: (_: string, member: ProjectMember) => {
                    if (member.role === MemberRoles.OWNER)
                      return (
                        <div className="flex items-center justify-center">
                          -
                        </div>
                      );
                    return (
                      <div className="space-x-4 flex">
                        <UpdateMember
                          member={member}
                          refetch={refetchProjectMembers}
                        />

                        <RemoveMember
                          projectMember={member}
                          refetchProjectMembers={refetchProjectMembers}
                        />
                      </div>
                    );
                  },
                },
              ]
            : []),
        ]}
        pagination={false}
        rowKey="_id"
        loading={isLoading}
      />

      <Pagination
        className="mt-3"
        align="center"
        total={totalCount}
        current={(currentPage as number) || 1}
        pageSize={perPage}
        onChange={(page) => {
          setFilters({ currentPage: page });
        }}
      />
    </div>
  );
};

export default TeamMembersTable;
