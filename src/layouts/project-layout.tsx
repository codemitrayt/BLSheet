import { Outlet, useParams } from "react-router-dom";
import { Spin } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";

import ProjectNavbar from "../components/project-navbar";
import projectService from "../services/project-service";

import useErrorHandler from "../hooks/useErrorHandler";
import useUserInfo from "../hooks/useUserInfo";

import { Project } from "../types";
import ProjectContext from "../providers/project-provider";

const ProjectLayout = () => {
  const { projectId } = useParams();
  const { authToken, user } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [project, setProject] = useState<Project | null>(null);

  const { isLoading, refetch: refetchProject } = useQuery({
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

  if (!project)
    return (
      <div className="py-16 flex items-center justify-center">
        Project Not found
      </div>
    );

  return (
    <ProjectContext.Provider
      value={{ project, isAdmin: project.userId === user?._id, refetchProject }}
    >
      <ProjectNavbar projectId={projectId} />
      <Outlet />
    </ProjectContext.Provider>
  );
};

export default ProjectLayout;
