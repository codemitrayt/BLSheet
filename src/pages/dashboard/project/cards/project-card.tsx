import { Badge, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { Project } from "../../../../types";
import DeleteProject from "../helpers/delete";
import { CgEye } from "react-icons/cg";

interface ProjectCardProps {
  project: Project;
  refetchProjectList: () => void;
}

const ProjectCard = ({ project, refetchProjectList }: ProjectCardProps) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    const url = `/dashboard/projects/${project._id}/details`;
    navigate(url);
  };

  return (
    <div className="border h-full shadow-sm rounded-lg overflow-hidden">
      <img
        src={project.img}
        alt={project.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-3">
        <div className="flex items-center space-x-2">
          <Badge color="#2F667F" status="processing" />
          <h1 className="text-primary font-medium">{project.name}</h1>
        </div>
        <div className="py-2">
          {project.tags.map((tag) => (
            <Tag color="#539BBB" key={tag} className="rounded-full px-3">
              {tag}
            </Tag>
          ))}
        </div>

        <p className="text-sm text-gray-600 h-[50px] hidden md:block">
          {project.description}
        </p>

        <p className="text-sm text-gray-600 md:hidden">{project.description}</p>

        <div className="flex items-center justify-end space-x-3 mt-3">
          <Tooltip title="View Project">
            <button
              onClick={handleRedirect}
              className="text-orange-500 hover:text-orange-500/80"
            >
              <CgEye />
            </button>
          </Tooltip>

          <DeleteProject
            objectId={project._id}
            refetchProjectList={refetchProjectList}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
