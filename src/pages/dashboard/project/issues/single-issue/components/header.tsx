import { VscIssues } from "react-icons/vsc";
import { formatDistance } from "date-fns";

import { capitalizeFirstLetter, cn } from "../../../../../../utils";
import { useIssueContext } from "../../../../../../providers/issue-provider";
import { IssueStatus } from "../../../../../../types";

const IssueHeader = () => {
  const { issue } = useIssueContext();

  if (!issue) return null;

  return (
    <div className="border-b pb-2 border-primary">
      <div className="flex items-center justify-between">
        <h1 className="text-primary font-medium">{issue?.title}</h1>
      </div>

      <div className="flex items-center space-y-2 mt-1">
        <div className="md:flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "flex items-center justify-center space-x-1 border rounded-full px-4 py-1 text-white",
                issue.status === IssueStatus.CLOSED
                  ? "bg-red-500"
                  : "bg-emerald-700"
              )}
            >
              <VscIssues />
              <span>{capitalizeFirstLetter(issue?.status)}</span>
            </div>
            <span className="text-sm text-primary font-medium">
              {issue.author.fullName}
            </span>
          </div>

          <div className="sm:flex items-center justify-center">
            <div className="text-sm">
              opened this issue {formatDistance(issue.createdAt, new Date())}{" "}
              ago
            </div>
            {!!issue.commentCount && (
              <div className="text-primary text-sm">
                ・{issue.commentCount} comments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueHeader;
