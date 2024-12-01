import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { MemberRoles } from "../../../../types";

import useAuth from "../../../../hooks/useAuth";
import useErrorHandler from "../../../../hooks/useErrorHandler";

import { useProjectContext } from "../../../../providers/project-provider";
import projectService from "../../../../services/project-service";

import TeamMembersTable from "./components/team-members-table";
import InviteMemberPopup from "./components/invite-member-popup";

import ProjectMemberFilters from "../../../../components/filters/project-member-filters";

const Members = () => {
  const { authToken } = useAuth();
  const { project } = useProjectContext();
  const { projectId } = useParams();
  const { handleError } = useErrorHandler();
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    document.title = `Members - BL Sheet`;
  }, []);

  const { refetch: refetchProjectMembers } = useQuery({
    queryKey: ["project-members"],
    queryFn: () =>
      projectService().getProjectMembers({
        data: { objectId: projectId },
        authToken,
        params: { perPage: 2, status: "accepted" },
      }),
    onSuccess: ({ data }) => {
      const count = data?.message?.totalCount;
      setTotalMembers(count);
    },
    onError: (error) => {
      console.error("ERROR :: project members ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (!project) return null;

  return (
    <div className="space-y-2">
      <div className="flex space-y-2 lg:space-y-0 flex-col lg:flex-row lg:items-center lg:justify-between bg-gray-100 p-3 rounded-lg w-full mt-3">
        <h1 className="text-primary text-lg font-medium">
          Team Members{" "}
          <span className="bg-primary rounded-full px-3 text-xs py-1 text-white">
            {totalMembers}
          </span>
        </h1>
        <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap lg:justify-center lg:flex-row">
          <ProjectMemberFilters />
          {project.role !== MemberRoles.MEMBER && (
            <InviteMemberPopup
              projectName={project?.name}
              projectId={project?._id}
              refetchProjectMembers={refetchProjectMembers}
            />
          )}
        </div>
      </div>

      <TeamMembersTable />
    </div>
  );
};

export default Members;
