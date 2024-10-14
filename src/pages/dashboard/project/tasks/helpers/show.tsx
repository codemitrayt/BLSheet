import { useNavigate, useParams } from "react-router-dom";

import ProjectTaskCard from "../cards/project-task-card";
import { cn } from "../../../../../utils";
import useAuth from "../../../../../hooks/useAuth";
import { ProjectTaskList, UserRole } from "../../../../../types";

interface ShowProjectTaskProps {
  projectTasks: ProjectTaskList;
  refetchProjectTask: () => void;
}

const ShowProjectTask = ({
  projectTasks,
  refetchProjectTask,
}: ShowProjectTaskProps) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user } = useAuth();

  const handleRedirect = () => {
    const url = `/dashboard/projects/${projectId}/tasks/completed`;
    navigate(url);
  };

  return (
    <div
      className={cn(
        "w-full overflow-x-auto flex space-x-3",
        user?.role === UserRole.GUEST
          ? "h-[calc(100vh_-350px)]"
          : "h-[calc(100vh_-190px)]"
      )}
    >
      <div className="space-y-3">
        <h1 className="text-primary font-medium w-[330px] border-b p-2">
          📋 TO DO{" "}
          <span className="bg-primary rounded-full px-3 text-white">
            {projectTasks?.todo ? projectTasks.todo.count : 0}
          </span>
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-250px)]"
          )}
        >
          {(projectTasks?.todo?.tasks || []).map((task) => (
            <ProjectTaskCard
              key={task._id}
              projectTask={task}
              refetchProjectTask={refetchProjectTask}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-primary font-medium border-b p-2 w-[330px]">
          🧑🏻‍💻 Working In Progress{" "}
          <span className="bg-primary rounded-full px-3 text-white">
            {projectTasks?.in_progress ? projectTasks.in_progress.count : 0}
          </span>
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-250px)]"
          )}
        >
          {(projectTasks?.in_progress?.tasks || []).map((task) => (
            <ProjectTaskCard
              key={task._id}
              projectTask={task}
              refetchProjectTask={refetchProjectTask}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-primary font-medium border-b p-2 w-[330px]">
          👀 Under Review{" "}
          <span className="bg-primary rounded-full px-3 text-white">
            {projectTasks?.under_review ? projectTasks?.under_review?.count : 0}
          </span>
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-250px)]"
          )}
        >
          {(projectTasks?.under_review?.tasks || []).map((task) => (
            <ProjectTaskCard
              key={task._id}
              projectTask={task}
              refetchProjectTask={refetchProjectTask}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-primary w-[330px] font-medium border-b p-2">
          ✅ Today's Completed{" "}
          <span className="bg-primary rounded-full px-3 text-white">
            {projectTasks?.completed ? projectTasks.completed.count : 0}
          </span>
          <button
            className="text-xs text-blue-500 hover:text-blue-500/80 pl-2"
            onClick={handleRedirect}
          >
            View all
          </button>
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-250px)]"
          )}
        >
          {(projectTasks?.completed?.tasks || []).map((task) => (
            <ProjectTaskCard
              key={task._id}
              projectTask={task}
              refetchProjectTask={refetchProjectTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProjectTask;
