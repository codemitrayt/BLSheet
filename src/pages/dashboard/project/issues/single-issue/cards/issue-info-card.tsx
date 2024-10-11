import { Avatar, Tag } from "antd";
import { BiDotsHorizontal } from "react-icons/bi";

import { Issue } from "../../../../../../types";
import SendComment from "../components/send-comment";
import { useProjectContext } from "../../../../../../providers/project-provider";

interface IssueInfoCard {
  issue: Issue;
}

const IssueInfoCard = ({ issue }: IssueInfoCard) => {
  const { isAdmin } = useProjectContext();

  return (
    <div className="col-span-4">
      <div className="mt-5 prose prose-stone !prose-sm max-w-full">
        <div className="border rounded-lg">
          <div className="px-4 py-2 border-b flex items-center justify-between">
            <div className="space-x-2">
              <Avatar className="bg-primary !text-sm" size={25}>
                {issue.author.fullName[0].toUpperCase()}
              </Avatar>
              <span className="font-medium text-primary">
                {issue.author.fullName}
              </span>
            </div>
            <div className="flex items-center justify-center">
              {isAdmin && <Tag className="px-2 rounded-full">Owner</Tag>}
              {issue.isAuthor && (
                <Tag className="px-2 rounded-full">Author</Tag>
              )}
              {(isAdmin || issue.author) && (
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
      <SendComment />
    </div>
  );
};

export default IssueInfoCard;
