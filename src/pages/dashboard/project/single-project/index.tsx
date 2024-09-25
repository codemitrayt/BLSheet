import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";

import TeamMembersTable from "./components/team-members-table";
import ProjectDetails from "./components/project-details";

import projectService from "../../../../services/project-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import { ProjectMember } from "../../../../types";
import { useProjectContext } from "../../../../providers/project-provider";
import RecentProjectTask from "./components/recent-project-task";

const SingleProjectPage = () => {
  const { authToken } = useUserInfo();
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
      const count = data?.message?.totalCount - 2;
      setTotalMembers(count);
      setMembers(members);
    },
    onError: (error) => {
      console.error("ERROR :: project members ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="relative h-full overflow-y-auto pb-8">
      <ProjectDetails
        totalMembers={totalMembers}
        project={project!}
        members={members}
        isLoading={loader}
        refetchProjectMembers={refetchProjectMembers}
      />
      <div className="grid xl:grid-cols-3 mt-3 gap-4">
        <TeamMembersTable
          isAdmin={project!.isAdmin}
          members={members}
          isLoading={loader}
          refetchProjectMembers={refetchProjectMembers}
        />
        <RecentProjectTask />
      </div>
    </div>
  );
};

export default SingleProjectPage;
