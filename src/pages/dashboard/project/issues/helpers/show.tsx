import { VscIssues } from "react-icons/vsc";
import { IoCheckmark } from "react-icons/io5";
import { Pagination } from "antd";
import { Issue } from "../../../../../types";
import IssueCard from "../cards/issue-card";

interface ShowIssues {
  issueList: Issue[];
  refetch: () => void;
}

const ShowIssues = ({ issueList, refetch }: ShowIssues) => {
  return (
    <div className="h-[calc(100vh_-170px)] overflow-y-auto">
      <div className="rounded-lg border mb-2">
        <div className="border-b p-3 justify-between">
          <div className="flex items-center space-x-4">
            <button className="space-x-1 flex items-center justify-center text-sm font-medium text-primary hover:text-primary transition-all">
              <div>
                <VscIssues />
              </div>
              <span>450 Open</span>
            </button>

            <button className="space-x-1 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-primary transition-all">
              <div>
                <IoCheckmark />
              </div>
              <span>600 Open</span>
            </button>
          </div>
        </div>

        {issueList.map((issue) => (
          <IssueCard key={issue._id} issue={issue} refetch={refetch} />
        ))}
      </div>
      <Pagination align="center" defaultCurrent={1} total={50} />
    </div>
  );
};

export default ShowIssues;
