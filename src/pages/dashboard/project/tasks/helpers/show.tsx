import { cn } from "../../../../../utils";
import useAuth from "../../../../../hooks/useAuth";
import ProjectTaskCard from "../cards/project-task-card";
import { ProjectTask, ProjectTaskStatus, UserRole } from "../../../../../types";

interface ShowProjectTaskProps {
  projectTasks: ProjectTask[];
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
          📋 TO DO
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-300px)]"
          )}
        >
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.TODO)
            .map((task) => (
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
          🧑🏻‍💻 Working In Progress
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-300px)]"
          )}
        >
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.IN_PROGRESS)
            .map((task) => (
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
          👀 Under Review
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-300px)]"
          )}
        >
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.UNDER_REVIEW)
            .map((task) => (
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
          ✅ Completed
        </h1>
        <div
          className={cn(
            "overflow-y-auto flex flex-col space-y-3",
            user?.role === UserRole.GUEST
              ? "h-[calc(100vh_-400px)]"
              : "h-[calc(100vh_-300px)]"
          )}
        >
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.COMPLETED)
            .map((task) => (
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
