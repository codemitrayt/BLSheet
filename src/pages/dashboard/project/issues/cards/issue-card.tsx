import { Avatar, Tag } from "antd";
import { VscIssues } from "react-icons/vsc";

import { Issue } from "../../../../../types";
import { getTimeDifference } from "../../../../../utils";
import { useNavigate, useParams } from "react-router-dom";

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
        <div className="relative">
          <VscIssues className="text-primary size-5" />
        </div>
        <h1
          onClick={handleOnClick}
          className="font-semibold text-primary text-md hover:text-secondary transition-all cursor-pointer"
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

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center justify-center space-x-2">
          <Avatar className="bg-primary !text-[10px]" size={20}>
            R
          </Avatar>
          <span className="text-primary text-[13px]">Rushikesh Mungse</span>
        </div>

        <span className="text-sm text-primary">
          Opened {getTimeDifference(issue.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
