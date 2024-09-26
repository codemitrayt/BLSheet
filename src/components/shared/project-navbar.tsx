import { NavLink } from "react-router-dom";

import { cn } from "../../utils";

import { TbBulb, TbListDetails } from "react-icons/tb";
import { RiTaskLine, RiTimeLine } from "react-icons/ri";
import { PiChatsLight } from "react-icons/pi";
import { GoProject } from "react-icons/go";
import { VscIssues } from "react-icons/vsc";

interface ProjectNavbarProps {
  projectId: string | undefined;
}

const ProjectNavbar = ({ projectId }: ProjectNavbarProps) => {
  return (
    <div className="border-b space-x-4 flex items-center">
      <NavLink
        to={`/dashboard/projects`}
        className={cn("text-sm pb-2 px-1 hover:text-primary transition-all")}
      >
        <div className="space-x-1 flex items-center">
          <GoProject />
          <span>Projects</span>
        </div>
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/details`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-2 px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        <div className="space-x-1 flex items-center">
          <TbListDetails />
          <span>Details</span>
        </div>
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/tasks`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-2 px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        <div className="space-x-1 flex items-center">
          <RiTaskLine />
          <span>Tasks</span>
        </div>
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/issues`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-2 px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        <div className="space-x-1 flex items-center">
          <VscIssues />
          <span>Issues</span>
        </div>
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/ideas`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-2 px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        <div className="space-x-1 flex items-center">
          <TbBulb />
          <span>Ideas</span>
        </div>
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/timeline`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-2 px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        <div className="space-x-1 flex items-center">
          <RiTimeLine />
          <span>Timeline</span>
        </div>
      </NavLink>

      <NavLink
        to={`/dashboard/projects/${projectId}/chats`}
        className={({ isActive }) =>
          cn(
            "text-sm pb-2 px-1 hover:text-primary transition-all",
            isActive && "text-primary border-b-2 border-primary font-medium"
          )
        }
      >
        <div className="space-x-1 flex items-center">
          <PiChatsLight />
          <span>Chats</span>
        </div>
      </NavLink>
    </div>
  );
};

export default ProjectNavbar;
