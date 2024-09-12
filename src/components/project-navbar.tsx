import { NavLink } from "react-router-dom";
import { cn } from "../utils";

interface ProjectNavbarProps {
  projectId: string | undefined;
}

const ProjectNavbar = ({ projectId }: ProjectNavbarProps) => {
  return (
    <div className="my-3 border-b pb-1 space-x-3">
      <NavLink
        to={`/dashboard/projects/${projectId}/details`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-[5px] px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        Details
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/tasks`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-[5px] px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        Tasks
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/timeline`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-[5px] px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        Timeline
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/chats`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-[5px] px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        Chats
      </NavLink>
    </div>
  );
};

export default ProjectNavbar;
