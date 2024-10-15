import Views from "./views";
import CreateProjectTask from "./helpers/create";

import { useProjectContext } from "../../../../providers/project-provider";
import ProjectTaskFilters from "../../../../components/filters/project-task-filters";

const ProjectTasks = () => {
  const { project } = useProjectContext();

  return (
    <div className="relative mt-3">
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4 border shadow-sm">
        <h1 className="text-primary font-bold">{project?.name}</h1>
        <div className="flex items-center justify-center space-x-4">
          <ProjectTaskFilters />
          <CreateProjectTask refetchProjectTaskList={() => {}} />
        </div>
      </div>
      <Views />
    </div>
  );
};

export default ProjectTasks;
