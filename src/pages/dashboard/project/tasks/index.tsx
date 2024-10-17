import { useState } from "react";

import Views from "./views";
import CreateProjectTask from "./helpers/create";

import { useProjectContext } from "../../../../providers/project-provider";
import ProjectTaskFilters from "../../../../components/filters/project-task-filters";

import { MdFilterList, MdFilterListOff } from "react-icons/md";

const ProjectTasks = () => {
  const { project } = useProjectContext();
  const [hideFilters, setHideFilters] = useState<boolean>(false);

  return (
    <div className="relative mt-3">
      <div className="absolute top-0 right-0 z-10">
        <button
          onClick={() => setHideFilters((prev) => !prev)}
          className="bg-primary size-4 flex items-center justify-center rounded-full text-white"
        >
          {hideFilters ? (
            <MdFilterList className="size-3" />
          ) : (
            <MdFilterListOff className="size-3" />
          )}
        </button>
      </div>
      {!hideFilters && (
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center md:justify-between p-3 bg-gray-100 rounded-lg mb-4 border shadow-sm">
          <h1 className="text-primary font-bold">{project?.name}</h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 xl:flex xl:flex-row xl:items-center xl:justify-center xl:space-x-4">
            <ProjectTaskFilters />
            <CreateProjectTask refetchProjectTaskList={() => {}} />
          </div>
        </div>
      )}
      <Views isHideFilters={hideFilters} />
    </div>
  );
};

export default ProjectTasks;
