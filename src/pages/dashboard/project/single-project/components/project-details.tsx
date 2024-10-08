import { Avatar, Spin } from "antd";

import InviteMemberPopup from "./invite-member-popup";
import GridEffect from "../../../../../components/effects/grid-effect";

import { Project, ProjectMember } from "../../../../../types";

interface ProjectDetailsProps {
  project: Project;
  isLoading: boolean;
  members: ProjectMember[];
  refetchProjectMembers: () => void;
  totalMembers: number;
}

const ProjectDetails = ({
  project,
  members,
  isLoading,
  refetchProjectMembers,
  totalMembers,
}: ProjectDetailsProps) => {
  return (
    <div className="relative bg-primary my-3 rounded-lg p-6">
      <GridEffect />
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {project.name}
        </h1>

        <div className="flex items-center space-x-3">
          {isLoading ? (
            <Spin size="small" />
          ) : (
            <Avatar.Group>
              {members.map((member) => (
                <Avatar style={{ background: "#2F667F" }} key={member._id}>
                  {member.memberEmailId[0].toUpperCase()}
                </Avatar>
              ))}
              {totalMembers > 0 && (
                <Avatar className="bg-primary">+{totalMembers}</Avatar>
              )}
            </Avatar.Group>
          )}

          {project.isAdmin && (
            <InviteMemberPopup
              projectName={project.name}
              projectId={project._id}
              refetchProjectMembers={refetchProjectMembers}
            />
          )}
        </div>
      </div>

      <p className="text-gray-100 text-sm">{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
