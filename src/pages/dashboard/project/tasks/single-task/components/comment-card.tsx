import { Avatar, Divider } from "antd";
import { formatDistance } from "date-fns";
import { useParams } from "react-router-dom";

import { Comment, MemberRoles } from "../../../../../../types";
import UpdateComment from "../../helpers/update-comment";
import DeleteComment from "../../helpers/delete-comment";

import { useProjectContext } from "../../../../../../providers/project-provider";

interface CommentCardProps {
  comment: Comment;
  refetchComments: () => void;
}

const CommentCard = ({ comment, refetchComments }: CommentCardProps) => {
  const { taskId, projectId } = useParams();
  const { project } = useProjectContext();

  return (
    <div>
      <Divider dashed type="vertical" className="border-zinc-300 h-5" />
      <div className="border rounded-md">
        <div className="bg-gray-100 flex items-center justify-between w-full px-3 border-b py-1 md:py-2">
          <div className="flex items-center justify-center space-x-1">
            <Avatar className="bg-primary !text-sm" size={22}>
              {comment.author.fullName[0].toUpperCase()}
            </Avatar>
            <span className="text-primary font-bold text-sm">
              {comment.author.fullName}
            </span>
          </div>
        </div>

        <div className="!text-sm px-6 md:px-8 prose py-1 md:py-2">
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </div>

        <div className="flex items-center justify-between px-6 md:px-8 border-t py-1">
          <div className="text-xs py-1 text-zinc-700">
            {formatDistance(comment.createdAt, new Date())} ago
          </div>

          {(comment.isCreator || project?.role !== MemberRoles.MEMBER) && (
            <div className="space-x-3 flex items-center">
              <UpdateComment
                comment={comment}
                projectTaskId={taskId as string}
                refetchProjectComment={refetchComments}
              />
              <DeleteComment
                projectId={projectId as string}
                commentId={comment._id}
                projectTaskId={taskId as string}
                refetchComments={refetchComments}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
