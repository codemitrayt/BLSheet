import { createContext, useContext } from "react";
import { Project } from "../types";

interface ProjectContext {
  project: Project | null;
  isAdmin: boolean;
  refetchProject: () => void;
}

const ProjectContext = createContext<ProjectContext>({
  project: null,
  isAdmin: false,
  refetchProject: () => {},
});

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context || !context.project)
    throw new Error("Project context not found");
  return context;
};

export default ProjectContext;
