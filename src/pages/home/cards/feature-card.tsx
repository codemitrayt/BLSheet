import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: ReactNode;
}

const FeatureCard = ({ title, Icon, description }: FeatureCardProps) => {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white">
      <div className="flex items-center space-x-2">
        {Icon}
        <h1 className="text-primary font-medium">{title}</h1>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default FeatureCard;
