import { LuListTodo } from "react-icons/lu";
import { TbReport } from "react-icons/tb";
import { MdInsertChartOutlined } from "react-icons/md";

import FeatureCard from "../cards/feature-card";
import { BiCommentDots } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { VscIssues } from "react-icons/vsc";

const features = [
  {
    title: "Collaboration and Communication",
    description:
      "Share your projects with team members, track progress, and collaborate on tasks efficiently.",
    Icon: <BiCommentDots className="size-8 text-primary" />,
  },
  {
    title: "Team and Resource Management",
    description:
      "Assign tasks to team members, track individual workloads, and manage resources to ensure balanced productivity.",
    Icon: <RiTeamLine className="size-8 text-primary" />,
  },
  {
    title: "Issue Tracking and Resolution",
    description:
      "Link issues to specific tasks, features, or milestones for a more integrated view of project challenges.",
    Icon: <VscIssues className="size-8 text-primary" />,
  },
  {
    title: "Productivity Tools",
    description:
      "Integrate to-do lists, task management, and calendar syncing to streamline your day-to-day tasks alongside your financial planning.",
    Icon: <LuListTodo className="size-8 text-primary" />,
  },
  {
    title: "Budgeting Made Simple",
    description:
      "Create, track, and optimize your budget effortlessly. Visualize your income and expenses with easy-to-read charts.",
    Icon: <MdInsertChartOutlined className="size-8 text-primary" />,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "BL Sheet generate customizable reports to get a complete overview of your financial health.",
    Icon: <TbReport className="size-8 text-primary" />,
  },
];

const FeatureCards = () => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-primary text-lg font-medium mb-3 md:text-3xl">
        Features:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <FeatureCard
            key={i}
            title={feature.title}
            description={feature.description}
            Icon={feature.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
