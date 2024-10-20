import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import { Issue } from "../../../../../types";
import queryKeys from "../../../../../constants/query-keys";
import issueService from "../../../../../services/issue-service";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

import IssueHeader from "./components/header";

import IssueInfoCard from "./cards/issue-info-card";
import IssueDataCard from "./cards/issue-data-card";
import BackButton from "../../../../../components/shared/back-button";
import IssueContext from "../../../../../providers/issue-provider";

const SingleIssue = () => {
  const { authToken } = useAuth();
  const { issueId, projectId } = useParams();
  const { handleError } = useErrorHandler();
  const [issue, setIssue] = useState<Issue>();

  const { isLoading, refetch } = useQuery({
    queryKey: [queryKeys.issue.getIssue],
    queryFn: () => issueService.getIssue({ authToken, params: { issueId } }),
    onSuccess: ({ data }) => {
      setIssue(data?.message?.issue);
    },
    onError: ({ error }) => {
      console.error("ERROR :: getIssue ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (isLoading || !issue) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spin />
      </div>
    );
  }

  return (
    <IssueContext.Provider value={{ issue, refetchIssue: refetch }}>
      <div className="relative">
        <div className="h-[calc(100vh_-100px)] overflow-y-auto pb-20 scroll-smooth pt-3">
          <div className="absolute top-4 left-4 hidden sm:block">
            <BackButton
              redirectUrl={`/dashboard/projects/${projectId}/issues`}
            />
          </div>

          <div className="sm:px-6 sm:w-[90%] mx-auto">
            <IssueHeader />
            <div className="space-y-5 md:grid grid-cols-6 md:space-x-8">
              <IssueInfoCard />
              <IssueDataCard />
            </div>
          </div>
        </div>
      </div>
    </IssueContext.Provider>
  );
};

export default SingleIssue;
