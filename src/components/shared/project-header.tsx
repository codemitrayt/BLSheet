import { Project } from "../../types";
import GridEffect from "./../effects/grid-effect";

const ProjectHeader = ({ project }: { project: Project }) => {
  return (
    <div className="w-full h-[150px] border rounded-xl items-center p-6 bg-primary relative">
      <GridEffect />
      <h1 className="text-3xl text-white font-medium mt-8 bg-gradient-to-r from-white to-zinc-900 bg-clip-text text-transparent">
        {project.name}
      </h1>
      <p className="text-gray-100 text-sm">{project.description}</p>
    </div>
  );
};

export default ProjectHeader;
