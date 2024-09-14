import { useQuery } from "react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";

import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";

import ShowProjects from "./helpers/show";
import CreateProject from "./helpers/create";

import { cn } from "../../../utils";
import { Project } from "../../../types";

import ProjectsTableView from "./components/projects-table-view";
import projectService from "../../../services/project-service";

import { IoMdGrid } from "react-icons/io";
import { MdOutlineListAlt } from "react-icons/md";

const DashboardProjectPage = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projectList, setProjectList] = useState<Project[]>([]);

  const _view = searchParams.get("view") || "board";
  const [view, setView] = useState(_view);

  const handleView = (view: string) => {
    setView(view);
    setSearchParams((params) => {
      params.set("view", view);
      return params;
    });
  };

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
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-primary font-bold">Your Projects</h1>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <div className="space-x-1 flex items-center justify-center">
            <IoMdGrid
              className={cn(
                "text-black size-5 cursor-pointer h-6 w-6 p-1",
                view === "board" && "text-white bg-primary rounded-sm"
              )}
              onClick={() => handleView("board")}
            />
            <MdOutlineListAlt
              className={cn(
                "text-black size-5 cursor-pointer h-6 w-6 p-1",
                view === "table" && "text-white bg-primary rounded-sm"
              )}
              onClick={() => handleView("table")}
            />
          </div>
          <CreateProject refetchProjectList={refetchProjectList} />
        </div>
      </div>
      <div className="h-[calc(100vh_-170px)] overflow-y-auto md:p-6 md:border md:rounded-lg md:shadow-sm scroll-smooth">
        {view === "table" ? (
          <ProjectsTableView
            projects={projectList}
            refetchProjectList={refetchProjectList}
          />
        ) : (
          <ShowProjects
            projects={projectList}
            refetchProjectList={refetchProjectList}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardProjectPage;
