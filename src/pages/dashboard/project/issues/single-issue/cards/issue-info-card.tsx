import { Avatar, Tag } from "antd";
import { BiDotsHorizontal } from "react-icons/bi";

import { Issue, MemberRoles } from "../../../../../../types";

import Comments from "../components/comments";
import ChangeStatusIssue from "../components/change-status-issue";
import DottedSeparator from "../../../../../../components/ui/dotted-separator";

import { useProjectContext } from "../../../../../../providers/project-provider";
import { useIssueContext } from "../../../../../../providers/issue-provider";

interface IssueInfoCard {
  issue: Issue;
  refetchIssue: () => void;
}

const IssueInfoCard = () => {
  const { issue } = useIssueContext();
  const { project } = useProjectContext();

  if (!issue) return null;

  return (
    <div className="col-span-4">
      <div className="mt-5 prose prose-stone !prose-sm max-w-full">
        <div className="border rounded-lg">
          <div className="px-4 py-2 border-b space-y-2 sm:space-y-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-x-2">
              <Avatar className="bg-primary !text-sm" size={25}>
                {issue.author.fullName[0].toUpperCase()}
              </Avatar>
              <span className="font-medium text-primary text-xs sm:text-sm">
                {issue.author.fullName}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-center">
              <div className="flex items-center">
                {<Tag className="px-2 rounded-full">{project?.role}</Tag>}
              </div>
              {(project?.role !== MemberRoles.MEMBER || issue.author) && (
                <button>
                  <BiDotsHorizontal />
                </button>
              )}
            </div>
          </div>
          <div
            className="px-5"
            dangerouslySetInnerHTML={{ __html: issue.description }}
          />
        </div>
      </div>
      <div className="py-2">
        <ChangeStatusIssue />
      </div>
      <DottedSeparator color="blue" />
      <div className="mt-3">
        <h1 className="text-sm font-medium text-primary">Disscussions</h1>
        <Comments />
      </div>
    </div>
  );
};

export default IssueInfoCard;
