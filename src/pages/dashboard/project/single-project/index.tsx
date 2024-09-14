import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { Spin } from "antd";

import ProjectDetails from "./components/project-details";
import projectService from "../../../../services/project-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import TeamMembersTable from "./components/team-members-table";
import { Project, ProjectMember } from "../../../../types";

const SingleProjectPage = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<ProjectMember[]>([]);

  const { isLoading: loader, refetch: refetchProjectMembers } = useQuery({
    queryKey: ["project-members"],
    queryFn: () =>
      projectService().getProjectMembers({
        data: { objectId: projectId },
        authToken,
      }),
    onSuccess: ({ data }) => {
      const members = data?.message?.projectMembers || [];
      setMembers(members);
    },
    onError: (error) => {
      console.error("ERROR :: project members ::", error);
      handleError(error);
    },
    retry: false,
  });

  const { isLoading } = useQuery({
    queryKey: ["get-product", projectId],
    queryFn: () =>
      projectService().getProject({
        params: { objectId: projectId },
        authToken,
      }),
    onSuccess: ({ data }) => {
      setProject(data?.message?.project);
    },
    onError: (error) => {
      console.log("Error :: get product ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="py-16 flex items-center justify-center">
        <Spin />
      </div>
    );

  if (!project) {
    return (
      <div className="py-16 flex items-center justify-center">
        Project not found!
      </div>
    );
  }

  return (
    <div className="relative">
      <ProjectDetails
        project={project}
        members={members}
        isLoading={loader}
        refetchProjectMembers={refetchProjectMembers}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-3">
        <TeamMembersTable
          members={members}
          isLoading={loader}
          refetchProjectMembers={refetchProjectMembers}
        />
      </div>
    </div>
  );
};

export default SingleProjectPage;
