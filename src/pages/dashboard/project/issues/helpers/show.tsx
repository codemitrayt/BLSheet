import { VscIssues } from "react-icons/vsc";
import { IoCheckmark } from "react-icons/io5";
import { Pagination } from "antd";

import IssueCard from "../cards/issue-card";
import { Issue } from "../../../../../types";
import { cn } from "../../../../../utils";
import IssueFilters from "../../../../../components/filters/issue-filters";
import useIssueFilters from "../../../../../hooks/useIssueFilters";

interface ShowIssues {
  issueList: Issue[];
  refetch: () => void;
  totalCount: number;
}

const ShowIssues = ({ issueList, refetch, totalCount }: ShowIssues) => {
  const {
    currentPage,
    setFilters,
    assignedToMe,
    sortByCreatedAt,
    createdByMe,
    search,
    status,
  } = useIssueFilters();

  return (
    <div className="h-[calc(100vh_-170px)] overflow-y-auto">
      <div className="rounded-lg border mb-2">
        <div className="border-b p-3 justify-between flex items-center">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                setFilters({
                  assignedToMe: assignedToMe === "true" ? true : false,
                  sortByCreatedAt: sortByCreatedAt === "true" ? true : false,
                  createdByMe: createdByMe === "true" ? true : false,
                  search,
                  status: "open",
                });
              }}
              className={cn(
                "space-x-1 flex items-center justify-center text-sm font-medium transition-all text-gray-400 hover:text-primary",
                (!status || status === "open") && "text-primary"
              )}
            >
              <div className="hidden sm:block">
                <VscIssues />
              </div>
              <span>{totalCount} Open</span>
            </button>

            <button
              onClick={() => {
                setFilters({
                  assignedToMe: assignedToMe === "true" ? true : false,
                  sortByCreatedAt: sortByCreatedAt === "true" ? true : false,
                  createdByMe: createdByMe === "true" ? true : false,
                  search,
                  status: "closed",
                });
              }}
              className={cn(
                "space-x-1 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-primary transition-all",
                status === "closed" && "text-primary"
              )}
            >
              <div className="hidden sm:block">
                <IoCheckmark />
              </div>
              <span>0 Closed</span>
            </button>
          </div>
          <IssueFilters />
        </div>

        {issueList.length === 0 ? (
          <div className="flex items-center justify-center text-primary py-2">
            No Issue Created Yet. Please Create New Issue.
          </div>
        ) : (
          issueList.map((issue) => (
            <IssueCard key={issue._id} issue={issue} refetch={refetch} />
          ))
        )}
      </div>
      {!!issueList.length && (
        <Pagination
          align="center"
          pageSize={15}
          defaultCurrent={currentPage ? (currentPage as unknown as number) : 1}
          total={totalCount}
          onChange={(page) => {
            setFilters({
              currentPage: page,
              assignedToMe: assignedToMe === "true" ? true : false,
              sortByCreatedAt: sortByCreatedAt === "true" ? true : false,
              createdByMe: createdByMe === "true" ? true : false,
              search,
              status,
            });
          }}
        />
      )}
    </div>
  );
};

export default ShowIssues;
