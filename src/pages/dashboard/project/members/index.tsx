import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";

import { ProjectMember } from "../../../../types";
import projectService from "../../../../services/project-service";
import useAuth from "../../../../hooks/useAuth";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import { useProjectContext } from "../../../../providers/project-provider";
import TeamMembersTable from "./components/team-members-table";
import InviteMemberPopup from "./components/invite-member-popup";
import ProjectMemberFilters from "../../../../components/filters/project-member-filters";

const Members = () => {
  const { authToken } = useAuth();
  const { project } = useProjectContext();
  const { projectId } = useParams();
  const { handleError } = useErrorHandler();
  const [totalMembers, setTotalMembers] = useState(0);
  const [members, setMembers] = useState<ProjectMember[]>([]);

  const { isLoading: loader, refetch: refetchProjectMembers } = useQuery({
    queryKey: ["project-members"],
    queryFn: () =>
      projectService().getProjectMembers({
        data: { objectId: projectId },
        authToken,
        params: { perPage: 2, status: "accepted" },
      }),
    onSuccess: ({ data }) => {
      const members = data?.message?.projectMembers || [];
      const count = data?.message?.totalCount;
      setTotalMembers(count);
      setMembers(members);
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
          {project.isAdmin && (
            <InviteMemberPopup
              projectName={project?.name}
              projectId={project?._id}
              refetchProjectMembers={refetchProjectMembers}
            />
          )}
        </div>
      </div>

      <TeamMembersTable
        isAdmin={project!.isAdmin}
        members={members}
        isLoading={loader}
        refetchProjectMembers={refetchProjectMembers}
      />
    </div>
  );
};

export default Members;
