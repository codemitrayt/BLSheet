import { useQuery } from "react-query";
import { useState } from "react";
import { Spin } from "antd";

import projectService from "../../../services/project-service";
import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { Project } from "../../../types";
import ShowProjects from "./helpers/show";

const DashboardProjectPage = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [projectList, setProjectList] = useState<Project[]>([]);

  const { isLoading, refetch: refetchProjectList } = useQuery({
    queryKey: ["get-project-list"],
    queryFn: () => projectService().getProjectList({ authToken }),
    onSuccess: ({ data }) => {
      const projects = data?.message?.projects || [];
      setProjectList(projects);
      console.log(projectList);
    },
    onError: (error) => {
      console.error("ERROR :: get project list ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="p-6 h-[calc(100vh_-80px)] overflow-y-auto">
      <ShowProjects
        projects={projectList}
        refetchProjectList={refetchProjectList}
      />
    </div>
  );
};

export default DashboardProjectPage;
