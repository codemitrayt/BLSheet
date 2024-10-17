import ProjectCard from "../cards/project-card";
import { Project } from "../../../../types";

interface ShowProjectsProps {
  projects: Project[];
  refetchProjectList: () => void;
}

const ShowProjects = ({ projects, refetchProjectList }: ShowProjectsProps) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 pb-12">
      {projects.map((project) => (
        <ProjectCard
          project={project}
          key={project._id}
          refetchProjectList={refetchProjectList}
        />
      ))}
    </div>
  );
};

export default ShowProjects;
