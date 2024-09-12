import { Avatar, Button } from "antd";
import { Project } from "../../../../../types";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-medium text-primary"> {project.name}</h1>
        <div className="flex items-center space-x-3">
          <Avatar.Group
            max={{
              count: 2,
              style: { background: "#2F667F" },
            }}
          >
            <Avatar style={{ background: "#2F667F" }}>R</Avatar>
            <Avatar style={{ background: "#2F667F" }}>P</Avatar>
            <Avatar style={{ background: "#2F667F" }}>J</Avatar>
          </Avatar.Group>

          <Button>Invite</Button>
        </div>
      </div>

      <p className="text-gray-600 text-sm">{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
