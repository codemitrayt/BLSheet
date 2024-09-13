import { useQuery } from "react-query";
import { useState } from "react";
import { Spin } from "antd";

import projectService from "../../../services/project-service";
import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { Project } from "../../../types";
import ShowProjects from "./helpers/show";
import CreateProject from "./helpers/create";
import { MdOutlineListAlt } from "react-icons/md";
import { IoMdGrid } from "react-icons/io";

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
    <div className="p-6">
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4 border shadow-sm">
        <div className="space-x-3 flex items-center justify-center">
          <span className="text-primary font-medium">View</span>
          <IoMdGrid className="text-primary size-5 cursor-pointer" />
          <MdOutlineListAlt className="text-black size-5 cursor-pointer" />
        </div>
        <CreateProject refetchProjectList={refetchProjectList} />
      </div>
      <div className="h-[calc(100vh_-170px)] overflow-y-auto md:p-6 md:border md:rounded-lg md:shadow-sm scroll-smooth">
        <ShowProjects
          projects={projectList}
          refetchProjectList={refetchProjectList}
        />
      </div>
    </div>
  );
};

export default DashboardProjectPage;
