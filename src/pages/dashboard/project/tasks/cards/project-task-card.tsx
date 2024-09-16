import { Avatar, Tag } from "antd";
import dateformat from "dateformat";

import { PiDotsThreeCircleLight } from "react-icons/pi";
import { IoAttachOutline } from "react-icons/io5";
import { LiaComment } from "react-icons/lia";
import { IoMdTime } from "react-icons/io";

import { ProjectTask } from "../../../../../types";
import { capitalizeFirstLetter, cn } from "../../../../../utils";

interface ProjectTaskCardProps {
  projectTask: ProjectTask;
  refetchProjectTask: () => void;
}

const PROJECT_TASK_PRIORITY_BG_COLOR = {
  low: "green",
  medium: "orange",
  high: "red",
};

const ProjectTaskCard = ({ projectTask }: ProjectTaskCardProps) => {
  return (
    <div className={cn("border w-[330px] rounded-lg h-fit shadow-sm bg-white")}>
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            {projectTask.tags.map((tag, ind) => (
              <Tag key={ind} className="rounded-full px-3">
                {capitalizeFirstLetter(tag)}
              </Tag>
            ))}
          </div>
          <button>
            <PiDotsThreeCircleLight />
          </button>
        </div>
        <h1 className="text-sm font-medium py-2">{projectTask.title}</h1>
        <p className="text-xs">{projectTask.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Tag color={PROJECT_TASK_PRIORITY_BG_COLOR[projectTask.priority]}>
              {projectTask.priority.toUpperCase()}
            </Tag>
          </div>
          <div className="space-x-1">
            <Avatar className="bg-primary !text-sm" size={25}>
              R
            </Avatar>
            <span className="text-sm text-primary">Rushikesh Mungse</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3">
        <Avatar.Group
          className="!text-xs !border-primary"
          max={{
            count: 2,
            style: { background: "#2F667F", border: "#2F667F" },
          }}
          size={25}
        >
          <Avatar className="bg-primary !text-xs !border-primary">R</Avatar>
          <Avatar className="bg-primary !text-xs !border-primary">S</Avatar>
          <Avatar className="bg-primary !text-xs !border-primary">T</Avatar>
          <Avatar className="bg-primary !text-xs !border-primary">U</Avatar>
        </Avatar.Group>

        <div className="flex items-center justify-center space-x-3">
          <div className="text-gray-800 flex items-center space-x-0.5 text-xs">
            <IoMdTime />
            <span className="text-xs">
              {dateformat(projectTask.startDate, "dd/mm/yyyy")}
            </span>
          </div>
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
