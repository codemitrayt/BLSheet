import GridEffect from "../../../../../components/effects/grid-effect";
import { useProjectContext } from "../../../../../providers/project-provider";

const ProjectDetails = () => {
  const { project } = useProjectContext();
  return (
    <div className="relative bg-primary my-3 rounded-lg p-6">
      <GridEffect />
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {project?.name}
        </h1>
      </div>
      <p className="text-gray-100 text-xs md:text-sm">{project?.description}</p>
    </div>
  );
};

export default ProjectDetails;
