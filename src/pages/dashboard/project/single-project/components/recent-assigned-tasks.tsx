import { Link, useParams } from "react-router-dom";

import TaskCard from "../cards/task-card";
import { ProjectTask } from "../../../../../types";

const RecentAssignedTasks = ({ tasks }: { tasks: ProjectTask[] }) => {
  const { projectId } = useParams();

  return (
    <div className="flex flex-col border rounded-t overflow-hidden w-full">
      <div className="p-2 flex items-center justify-between bg-white">
        <h1 className="text-primary font-medium text-sm">
          Recently Assigned Tasks
        </h1>
        <Link
          to={`/dashboard/projects/${projectId}/tasks`}
          className="text-xs md:text-sm text-primary hover:text-primary/80"
        >
          View All
        </Link>
      </div>

      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};

export default RecentAssignedTasks;
