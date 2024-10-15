import React from "react";
import { Badge } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import {
  TASK_CARD_BORDER_COLOR,
  TASK_STATUS_DOT_COLOR,
} from "../../../../../constants";
import { ProjectTask } from "../../../../../types";
import { cn } from "../../../../../utils";

interface EventCard {
  task: ProjectTask;
}

const EventCard = ({ task }: EventCard) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const url = `/dashboard/projects/${projectId}/tasks/${task._id}`;
    navigate(url);
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "rounded-md p-1 border-l-2 text-xs bg-gray-100 cursor-pointer",
        TASK_CARD_BORDER_COLOR[task.priority]
      )}
    >
      <div className="w-full">
        <div className="flex items-center space-x-1">
          <Badge color={TASK_STATUS_DOT_COLOR[task.status]} />
          <h1 className="text-primary truncate font-medium">{task.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
