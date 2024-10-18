import { Avatar, Tag } from "antd";
import { VscIssues } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";

import { Issue } from "../../../../../types";
import { formatDistance } from "date-fns";

interface IssueCardProps {
  issue: Issue;
  refetch: () => void;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleOnClick = () => {
    const redirectUrl = `/dashboard/projects/${projectId}/issues/${issue._id}`;
    navigate(redirectUrl);
  };

  return (
    <div className="border-b p-3 last:border-b-0">
      <div className="flex items-center space-x-2">
        <div className="relative hidden sm:block">
          <VscIssues className="text-primary size-5" />
        </div>
        <h1
          onClick={handleOnClick}
          className="font-semibold text-sm text-primary md:text-md hover:text-primary/80 transition-all cursor-pointer"
        >
          {issue.title}
        </h1>
      </div>

      {!!issue.labels.length && (
        <div className="mt-2">
          {issue.labels.map((label, idx) => (
            <Tag key={idx} color="orange" className="px-2 rounded-full">
              {label}
            </Tag>
          ))}
        </div>
      )}

      <div className="flex space-y-2 sm:space-y-0 sm:items-center flex-col sm:flex-row sm:justify-between mt-3">
        <div className="flex items-center sm:justify-center space-x-2">
          <Avatar className="bg-primary !text-[10px]" size={20}>
            {issue.author.fullName[0].toUpperCase()}
          </Avatar>
          <span className="text-primary text-[13px]">
            {issue.author.fullName}
          </span>
        </div>

        <span className="text-xs text-primary">
          Opened {formatDistance(issue.createdAt, new Date())} ago
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
