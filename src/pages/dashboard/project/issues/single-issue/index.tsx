import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Avatar, Button, Spin, Tag } from "antd";
import dateFormat from "dateformat";

import { VscIssues } from "react-icons/vsc";

import { Issue, IssueStatus } from "../../../../../types";
import queryKeys from "../../../../../constants/query-keys";
import { capitalizeFirstLetter } from "../../../../../utils";
import issueService from "../../../../../services/issue-service";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import { useProjectContext } from "../../../../../providers/project-provider";
import { BiDotsHorizontal } from "react-icons/bi";

const SingleIssue = () => {
  const { project } = useProjectContext();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { issueId } = useParams();
  const [issue, setIssue] = useState<Issue>();

  const { isLoading } = useQuery({
    queryKey: [queryKeys.issue.getIssue],
    queryFn: () => issueService.getIssue({ authToken, params: { issueId } }),
    onSuccess: ({ data }) => {
      console.log("issue", data);
      setIssue(data?.message?.issue);
    },
    onError: ({ error }) => {
      console.error("ERROR :: getIssue ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spin />
      </div>
    );
  }

  if (!issue) return <div>Issue Not Found!</div>;

  return (
    <div className="relative">
      <div className="w-[90%] mx-auto py-6">
        <div className=" border-b pb-2 border-primary">
          <div className="flex items-center justify-between">
            <h1 className="text-primary font-medium">{issue?.title}</h1>
            <Button type="primary" className="ring-0">
              New issue
            </Button>
          </div>

          <div className="flex items-center space-y-2 mt-1">
            <div className="md:flex items-center justify-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center space-x-1 border rounded-full px-4 py-1 bg-emerald-700 text-white">
                  <VscIssues />
                  <span>{capitalizeFirstLetter(issue?.status)}</span>
                </div>
                <span className="text-sm text-primary font-medium">
                  Rushikesh Mungse
                </span>
              </div>

              <div className="sm:flex items-center justify-center">
                <div className="text-sm">
                  opened this issue on{" "}
                  {dateFormat(issue.createdAt, "dd/mm/yyyy")}
                </div>
                <div className="text-primary text-sm">・5 comments</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 grid grid-cols-6 space-x-8">
          <div className="col-span-4">
            <div className="mt-5 prose prose-stone !prose-sm max-w-full">
              <div className="border rounded-lg">
                <div className="px-4 py-2 border-b flex items-center justify-between">
                  <div className="space-x-2">
                    <Avatar className="bg-primary !text-sm" size={25}>
                      R
                    </Avatar>
                    <span className="font-medium text-primary">
                      Rushikesh Mungse
                    </span>
                  </div>
                  <BiDotsHorizontal />
                </div>
                <div
                  className="px-5"
                  dangerouslySetInnerHTML={{ __html: issue.description }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 w-full col-span-2">
            <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
              <h1 className="text-primary text-sm font-medium">Assingee</h1>
              <div className="flex items-center">
                <Avatar className="bg-primary">R</Avatar>
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
              <h1 className="text-primary text-sm font-medium">Labels</h1>
              <div className="flex items-center">
                {issue.labels.map((label, i) => (
                  <Tag color="orange" key={i}>
                    {label}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
              <h1 className="text-primary text-sm font-medium">Project</h1>
              <div className="flex items-center">
                <h1 className="text-sm">{project?.name}</h1>
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
              <h1 className="text-primary text-sm font-medium">Status</h1>
              <div className="flex items-center">
                <Tag
                  color={issue.status === IssueStatus.OPEN ? "green" : "red"}
                >
                  {issue.status.toUpperCase()}
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleIssue;
