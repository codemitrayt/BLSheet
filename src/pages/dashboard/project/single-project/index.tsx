import { useEffect } from "react";
import ProjectDetails from "./components/project-details";
import RecentProjectTask from "./components/recent-project-task";
import { useProjectContext } from "../../../../providers/project-provider";

const SingleProjectPage = () => {
  const { project } = useProjectContext();

  useEffect(() => {
    document.title = `${project?.name} - BL Sheet`;
  }, [project]);

  return (
    <div className="relative h-full overflow-y-auto pb-8">
      <ProjectDetails />
      <RecentProjectTask />
    </div>
  );
};

export default SingleProjectPage;
