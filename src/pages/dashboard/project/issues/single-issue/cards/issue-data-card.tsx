import { Avatar, Tag } from "antd";

import { IssueStatus } from "../../../../../../types";
import { useProjectContext } from "../../../../../../providers/project-provider";
import { useIssueContext } from "../../../../../../providers/issue-provider";

const IssueDataCard = () => {
  const { issue } = useIssueContext();
  const { project } = useProjectContext();

  if (!issue) return null;

  return (
    <div className="space-y-3 w-full col-span-2">
      <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
        <h1 className="text-primary text-sm font-medium">Assingees</h1>
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
          <Tag color={issue.status === IssueStatus.OPEN ? "green" : "red"}>
            {issue.status.toUpperCase()}
          </Tag>
        </div>
      </div>
    </div>
  );
};

export default IssueDataCard;
