import { Link, useParams } from "react-router-dom";

import TaskCard from "../cards/task-card";
import { ProjectTask } from "../../../../../types";

const RecentAssignedTasks = ({ tasks }: { tasks: ProjectTask[] }) => {
  const { projectId } = useParams();

  return (
    <div className="flex flex-col border rounded-md overflow-hidden w-full bg-white">
      <div className="p-2 flex items-center justify-between bg-gray-100">
        <h1 className="text-primary font-bold text-sm">
          Recently Assigned Tasks
        </h1>
        <Link
          to={`/dashboard/projects/${projectId}/tasks`}
          className="text-xs md:text-sm text-primary hover:text-primary/80"
        >
          View All
        </Link>
      </div>

      {tasks.length === 0 && (
        <div className="flex items-center justify-center p-2 text-sm">
          No tasks
        </div>
      )}

      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};

export default RecentAssignedTasks;
