import { VscIssues } from "react-icons/vsc";
import { formatDistance } from "date-fns";

import { Issue } from "../../../../../../types";
import { capitalizeFirstLetter } from "../../../../../../utils";

interface IssueHeader {
  issue: Issue;
}

const IssueHeader = ({ issue }: IssueHeader) => {
  return (
    <div className="border-b pb-2 border-primary">
      <div className="flex items-center justify-between">
        <h1 className="text-primary font-medium">{issue?.title}</h1>
      </div>

      <div className="flex items-center space-y-2 mt-1">
        <div className="md:flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center space-x-1 border rounded-full px-4 py-1 bg-emerald-700 text-white">
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
