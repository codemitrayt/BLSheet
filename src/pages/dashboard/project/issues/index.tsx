import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";

import CreateIssue from "./helpers/create";

import queryKeys from "../../../../constants/query-keys";
import issueService from "../../../../services/issue-service";
import IssueFilters from "../../../../components/filters/issue-filters";

import useAuth from "../../../../hooks/useAuth";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import ShowIssues from "./helpers/show";
import { Issue } from "../../../../types";
import useIssueFilters from "../../../../hooks/useIssueFilters";

const ProjectIssues = () => {
  const { authToken } = useAuth();
  const { projectId } = useParams();
  const { handleError } = useErrorHandler();
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const {
    status,
    search,
    assignedToMe,
    sortByCreatedAt,
    createdByMe,
    currentPage,
  } = useIssueFilters();

  const { isLoading, refetch } = useQuery({
    queryKey: [
      queryKeys.issue.getIssues,
      {
        search,
        assignedToMe,
        sortByCreatedAt,
        createdByMe,
        currentPage,
        status,
      },
    ],
    queryFn: () =>
      issueService.getIssues({
        authToken,
        params: {
          projectId,
          search,
          currentPage,
          isSort: sortByCreatedAt,
          isAssignedToMe: assignedToMe,
          isCreatedByMe: createdByMe,
          status: status ? status : "open",
          perPage: 15,
        },
      }),
    onSuccess: ({ data }) => {
      const count = data?.message?.metadata?.totalCount;
      setIssueList(data?.message?.issues || []);
      setTotalCount(count);
    },
    onError: (error) => {
      console.error("ERROR :: getIssues ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="relative">
      <div className="grid sm:grid-cols-6">
        <div className="relative space-y-4 sm:col-span-4">
          <div className="mt-3 space-x-4 flex items-center justify-between">
            <IssueFilters onlySearch={true} />
            <CreateIssue refetch={refetch} />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spin />
            </div>
          ) : (
            <ShowIssues
              refetch={refetch}
              issueList={issueList}
              totalCount={totalCount}
            />
          )}
        </div>

        <div className="col-span-2 hidden sm:block p-3">
          <h1>Analytics</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectIssues;
