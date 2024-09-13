import { Avatar } from "antd";

import { Project } from "../../../../../types";
import GridEffect from "../../../../../components/effects/grid-effect";
import InviteMemberPopup from "./invite-member-popup";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="relative bg-primary my-3 rounded-lg p-6">
      <GridEffect />
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {project.name}
        </h1>

        <div className="flex items-center space-x-3">
          <Avatar.Group
            max={{
              count: 3,
              style: { background: "#2F667F" },
            }}
          >
            <Avatar style={{ background: "#2F667F" }}>R</Avatar>
            <Avatar style={{ background: "#2F667F" }}>P</Avatar>
            <Avatar style={{ background: "#2F667F" }}>T</Avatar>
            <Avatar style={{ background: "#2F667F" }}>J</Avatar>
          </Avatar.Group>

          <InviteMemberPopup projectName={project.name} />
        </div>
      </div>

      <p className="text-gray-100 text-sm">{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
