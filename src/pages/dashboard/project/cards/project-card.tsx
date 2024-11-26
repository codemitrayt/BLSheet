import { Badge, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { CgEye } from "react-icons/cg";

import { MemberRoles, Project } from "../../../../types";
import { RoleColorMap } from "../../../../constants";
import { capitalizeFirstLetter, strSlice } from "../../../../utils";

import UpdateProject from "../helpers/update";
import DeleteProject from "../helpers/delete";

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
      <div className="cursor-pointer" onClick={handleRedirect}>
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
                {capitalizeFirstLetter(tag)}
              </Tag>
            ))}
          </div>

          <p className="text-sm text-gray-600 h-[50px] hidden md:block">
            {strSlice(project.description, 100)}
          </p>

          <p className="text-xs text-gray-600 md:hidden">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-2 mt-2 border-t">
        <div>
          <Tag
            color={RoleColorMap[project.role ?? "member"]}
            className="w-[100px] flex items-center justify-center"
          >
            {capitalizeFirstLetter(project.role ? project.role : "Member")}
          </Tag>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <Tooltip title="View Project">
            <button
              onClick={handleRedirect}
              className="text-orange-500 hover:text-orange-500/80"
            >
              <CgEye />
            </button>
          </Tooltip>

          {project.role === MemberRoles.OWNER && (
            <>
              <UpdateProject
                project={project}
                refetchProjectList={refetchProjectList}
              />

              <DeleteProject
                objectId={project._id}
                refetchProjectList={refetchProjectList}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
