import { ProjectTask, ProjectTaskStatus } from "../../../../../types";
import ProjectTaskCard from "../cards/project-task-card";

interface ShowProjectTaskProps {
  projectTasks: ProjectTask[];
  refetchProjectTask: () => void;
}

const ShowProjectTask = ({
  projectTasks,
  refetchProjectTask,
}: ShowProjectTaskProps) => {
  return (
    <div className="w-full h-[calc(100vh_-240px)] overflow-x-auto flex space-x-3">
      <div className="space-y-3">
        <h1 className="text-primary font-medium border-b p-2">📋 TO DO</h1>
        <div className="overflow-y-auto h-[calc(100vh_-300px)] flex flex-col space-y-3">
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.TODO)
            .map((task) => (
              <ProjectTaskCard
                projectTask={task}
                refetchProjectTask={refetchProjectTask}
              />
            ))}
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-primary font-medium border-b p-2">
          🧑🏻‍💻 Working In Progress
        </h1>
        <div className="overflow-y-auto h-[calc(100vh_-300px)] flex flex-col space-y-3">
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.IN_PROGRESS)
            .map((task) => (
              <ProjectTaskCard
                projectTask={task}
                refetchProjectTask={refetchProjectTask}
              />
            ))}
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-primary font-medium border-b p-2">
          👀 Under Review
        </h1>
        <div className="overflow-y-auto h-[calc(100vh_-300px)] flex flex-col space-y-3">
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.UNDER_REVIEW)
            .map((task) => (
              <ProjectTaskCard
                projectTask={task}
                refetchProjectTask={refetchProjectTask}
              />
            ))}
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-primary font-medium border-b p-2">✅ Completed</h1>
        <div className="overflow-y-auto h-[calc(100vh_-300px)] flex flex-col space-y-3">
          {projectTasks
            .filter((task) => task.status === ProjectTaskStatus.COMPLETED)
            .map((task) => (
              <ProjectTaskCard
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
