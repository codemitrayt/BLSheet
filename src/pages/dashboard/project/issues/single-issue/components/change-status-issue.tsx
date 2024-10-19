import { Avatar, Button } from "antd";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { formatDistance } from "date-fns";

import { FaCheckCircle } from "react-icons/fa";

import { IssueStatus } from "../../../../../../types";
import useAuth from "../../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../../hooks/useErrorHandler";
import { useIssueContext } from "../../../../../../providers/issue-provider";
import issueService from "../../../../../../services/issue-service";

const ChangeStatusIssue = () => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { issueId, projectId } = useParams();
  const { issue, refetchIssue } = useIssueContext();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["CLOSE_ISSUE"],
    mutationFn: ({ data }: { data: { status: IssueStatus } }) =>
      issueService.changeIssueStatus({
        data,
        params: { issueId, projectId },
        authToken,
      }),
    onSuccess: ({ data }) => {
      console.log("data ::", data);
      refetchIssue();
    },
    onError: (error) => {
      console.error("ERROR :: Close Issue ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (!issue) return null;

  if (issue.status === "open") {
    return (
      <div className="flex items-center md:justify-end">
        <Button
          danger
          type="primary"
          className="w-full md:w-fit"
          icon={<FaCheckCircle />}
          loading={isLoading}
          onClick={() => mutate({ data: { status: IssueStatus.CLOSED } })}
        >
          Close issue
        </Button>
      </div>
    );
  }

  return (
    <div className="flex xl:items-center xl:space-x-3 justify-between flex-col space-y-2 xl:space-y-0 xl:flex-row">
      <div className="flex justify-between xl:items-center space-x-1 flex-row">
        <div className="flex xl:items-center xl:justify-center space-x-1">
          <Avatar className="bg-primary !text-xs" size={20}>
            {issue.closedBy?.fullName[0].toUpperCase()}
          </Avatar>
          <span className="font-medium text-primary text-xs items-center justify-center hidden sm:flex">
            {issue.closedBy?.fullName}
          </span>
        </div>

        <span className="text-xs">
          Closed this {formatDistance(issue.closedIssueDate, new Date())} ago
        </span>
      </div>

      <div className="w-full xl:w-fit">
        <Button
          type="primary"
          className="ring-0 w-full xl:w-fit"
          icon={<FaCheckCircle />}
          loading={isLoading}
          onClick={() => mutate({ data: { status: IssueStatus.OPEN } })}
        >
          Open issue
        </Button>
      </div>
    </div>
  );
};

export default ChangeStatusIssue;
