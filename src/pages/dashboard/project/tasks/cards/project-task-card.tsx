import { Avatar, Tag } from "antd";

import { PiDotsThreeCircleLight } from "react-icons/pi";
import { IoAttachOutline } from "react-icons/io5";
import { LiaComment } from "react-icons/lia";

import { ProjectTask } from "../../../../../types";
import { cn } from "../../../../../utils";

interface ProjectTaskCardProps {
  projectTask: ProjectTask;
  refetchProjectTask: () => void;
}

const PROJECT_TASK_PRIORITY_BG_COLOR = {
  low: "green-inverse",
  medium: "orange-inverse",
  high: "red-inverse",
};

const PROJECT_TASK_STATUS_COLOR = {
  todo: "red-inverse",
  in_progress: "orange-inverse",
  under_review: "blue-inverse",
  completed: "green-inverse",
};

const STATUS_NAMING = {
  todo: "TO DO",
  in_progress: "IN PROGRESS",
  under_review: "UNDER REVIEW",
  completed: "COMPLETED",
};

const ProjectTaskCard = ({ projectTask }: ProjectTaskCardProps) => {
  return (
    <div className={cn("border w-[330px] rounded-lg h-fit shadow-sm bg-white")}>
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            {projectTask.tags.map((tag, ind) => (
              <Tag key={ind} color="#2F667F" className="rounded-full px-3">
                {tag}
              </Tag>
            ))}
          </div>
          <button>
            <PiDotsThreeCircleLight />
          </button>
        </div>
        <h1 className="text-sm font-medium py-2">{projectTask.title}</h1>
        <p className="text-xs">{projectTask.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-2">
            <Tag color={PROJECT_TASK_STATUS_COLOR[projectTask.status]}>
              {STATUS_NAMING[projectTask.status]}
            </Tag>
            <Tag color={PROJECT_TASK_PRIORITY_BG_COLOR[projectTask.priority]}>
              {projectTask.priority.toUpperCase()}
            </Tag>
          </div>
          <Avatar className="bg-primary">R</Avatar>
        </div>
      </div>

      <div className="flex items-center justify-between p-3">
        <Avatar.Group max={{ count: 2, style: { background: "#2F667F" } }}>
          <Avatar className="bg-primary">R</Avatar>
          <Avatar className="bg-primary">S</Avatar>
          <Avatar className="bg-primary">T</Avatar>
          <Avatar className="bg-primary">U</Avatar>
        </Avatar.Group>

        <div className="flex items-center justify-center space-x-3">
          <button className="text-primary hover:text-primary/80 transition-all flex items-center justify-center space-x-0.4">
            <IoAttachOutline className="size-4" />
            <span className="text-sm">12</span>
          </button>

          <button className="text-primary hover:text-primary/80 transition-all flex items-center justify-center space-x-0.4">
            <LiaComment className="size-4" />
            <span className="text-sm">5</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskCard;
