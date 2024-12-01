import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";

import useAuth from "../../../hooks/useAuth";
import useErrorHandler from "../../../hooks/useErrorHandler";

import ShowProjects from "./helpers/show";
import CreateProject from "./helpers/create";

import { cn } from "../../../utils";
import { Project, UserRole } from "../../../types";

import ProjectsTableView from "./components/projects-table-view";
import projectService from "../../../services/project-service";

import { IoMdGrid } from "react-icons/io";
import { MdOutlineListAlt } from "react-icons/md";
import DottedSeparator from "../../../components/ui/dotted-separator";

const DashboardProjectPage = () => {
  const { authToken, user } = useAuth();
  const { handleError } = useErrorHandler();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projectList, setProjectList] = useState<Project[]>([]);

  const _view = searchParams.get("view") || "table";
  const [view, setView] = useState(_view);

  useEffect(() => {
    document.title = "Projects - BL Sheet";
  }, []);

  const handleView = (view: string) => {
    setView(view);
    setSearchParams((params) => {
      params.set("view", view);
      return params;
    });
  };

  const { isLoading, refetch: refetchProjectList } = useQuery({
    queryKey: ["get-project-list"],
    queryFn: () => projectService().getProjectsWithRole({ authToken }),
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
    <div className="relative">
      {/* p-3 bg-gray-100 rounded-lg mb-4 border shadow-sm */}
      <div className="flex md:items-center flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between">
        <div className="flex md:items-center md:justify-center space-x-4">
          <h1 className="text-primary font-bold">Your Projects</h1>
        </div>

        <div className="flex items-center justify-between md:justify-center space-x-4">
          <div className="space-x-1 flex items-center justify-center">
            <button
              className={cn(
                "px-3 py-1 flex items-center space-x-1 rounded-md border shadow-sm",
                view === "board" && "text-white bg-primary"
              )}
              onClick={() => handleView("board")}
            >
              <IoMdGrid className="size-5" />
              <span className="text-sm hidden md:block">board</span>
            </button>

            <button
              className={cn(
                "px-3 py-1 flex items-center space-x-1 rounded-md border shadow-sm",
                view === "table" && "text-white bg-primary"
              )}
              onClick={() => handleView("table")}
            >
              <MdOutlineListAlt className="size-5" />
              <span className="text-sm hidden md:block">Table</span>
            </button>
          </div>
          <CreateProject refetchProjectList={refetchProjectList} />
        </div>
      </div>

      <DottedSeparator className="my-4" />

      {/* md:border md:rounded-lg md:shadow-sm md:p-6 */}
      <div
        className={cn(
          "overflow-y-auto scroll-smooth",
          user?.role === UserRole.GUEST
            ? "h-[calc(100vh_-260px)]"
            : "h-[calc(100vh_-160px)]"
        )}
      >
        {projectList?.length === 0 ? (
          <div className="flex items-center justify-center text-primary font-semibold">
            No Projects Yet? Get Started by Creating Your First One and Invite
            Your Team!
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardProjectPage;
