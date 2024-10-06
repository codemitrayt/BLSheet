import { cn } from "../../../../../utils";
import useAuth from "../../../../../hooks/useAuth";
import ProjectTaskCard from "../cards/project-task-card";
import { ProjectTaskList, UserRole } from "../../../../../types";

interface ShowProjectTaskProps {
  projectTasks: ProjectTaskList;
  refetchProjectTask: () => void;
}

const ShowProjectTask = ({
  projectTasks,
  refetchProjectTask,
}: ShowProjectTaskProps) => {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "w-full overflow-x-auto flex space-x-3",
        user?.role === UserRole.GUEST
          ? "h-[calc(100vh_-350px)]"
          : "h-[calc(100vh_-240px)]"
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
              : "h-[calc(100vh_-300px)]"
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
              : "h-[calc(100vh_-300px)]"
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
              : "h-[calc(100vh_-300px)]"
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
          ✅ Completed{" "}
          <span className="bg-primary rounded-full px-3 text-white">
            {projectTasks?.completed ? projectTasks.completed.count : 0}
          </span>
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-300px)]"
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
