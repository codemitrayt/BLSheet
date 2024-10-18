import { Avatar } from "antd";

import { Comment } from "../../../../../types";
import { cn, getTimeDifference } from "../../../../../utils";

import DeleteComment from "../helpers/delete-comment";
import UpdateComment from "../helpers/update-comment";
import ReplyComment from "../helpers/reply-comment";
import ShowReplies from "../helpers/show-replies";

interface CommentCard {
  comment: Comment;
  isAdmin: boolean;
  projectId: string;
  projectTaskId: string;
  refetchComments: () => void;
  isReply?: boolean;
  parentCommentId?: string;
}

const CommentCard = ({
  comment,
  isAdmin,
  projectId,
  projectTaskId,
  refetchComments,
  isReply = false,
  parentCommentId,
}: CommentCard) => {
  return (
    <div
      className={cn(
        "relative w-full gap-1 flex border-b border-primary pb-8",
        isReply && "px-3 py-3 border-none"
      )}
    >
      <div className="pt-1">
        <Avatar className="bg-primary">
          {comment.author.fullName[0].toUpperCase()}
        </Avatar>
      </div>

      <div className="w-full">
        <div className="bg-white border shadow-sm rounded-md px-3 py-1">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-primary font-semibold">
              {comment.author.fullName}
            </h1>
            <div className="text-xs text-gray-500 font-light">
              {getTimeDifference(comment.createdAt)}
            </div>
          </div>
          <p className="text-xs w-full py-1">{comment.content}</p>
        </div>

        <div className="w-full relative mt-2">
          <ShowReplies
            projectTaskId={projectTaskId}
            commentId={comment._id}
            replyCount={comment.replyCount}
          />
          {/* <div className="h-[15px] w-[1px] bg-gray-500" /> */}

          <ReplyComment
            commentId={comment._id}
            refecthComments={refetchComments}
          />

          {(comment.isCreator || isAdmin) && (
            <>
              {/* <div className="h-[15px] w-[1px] bg-gray-500" /> */}
              <UpdateComment
                comment={comment}
                projectTaskId={projectTaskId}
                refetchProjectComment={refetchComments}
              />
              {/* <div className="h-[15px] w-[1px] bg-gray-500" /> */}
              <DeleteComment
                projectId={projectId}
                commentId={comment._id}
                projectTaskId={projectTaskId}
                refetchComments={refetchComments}
                parentCommentId={parentCommentId}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
