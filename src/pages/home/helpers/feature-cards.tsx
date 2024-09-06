import { LuListTodo } from "react-icons/lu";
import { TbReport } from "react-icons/tb";
import { MdInsertChartOutlined } from "react-icons/md";

import FeatureCard from "../cards/feature-card";

const features = [
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
