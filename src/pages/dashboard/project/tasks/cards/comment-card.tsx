import { Avatar } from "antd";

import { AiOutlineComment } from "react-icons/ai";
import { RiReplyLine } from "react-icons/ri";

import { Comment } from "../../../../../types";
import DeleteComment from "../helpers/delete-comment";
import UpdateComment from "../helpers/update-comment";
import { cn, getTimeDifference } from "../../../../../utils";
import ReplyComment from "../helpers/reply-comment";
import ShowReplies from "../helpers/show-replies";

interface CommentCard {
  comment: Comment;
  isAdmin: boolean;
  projectId: string;
  projectTaskId: string;
  refetchComments: () => void;
  isReply?: boolean;
}

const CommentCard = ({
  comment,
  isAdmin,
  projectId,
  projectTaskId,
  refetchComments,
  isReply = false,
}: CommentCard) => {
  return (
    <div
      className={cn(
        "relative w-full flex gap-1 border-b border-primary pb-8",
        isReply &&
          "border-primary/20 border px-3 pb-8 pt-3 shadow-sm rounded-md"
      )}
    >
      <div className="w-[50px]">
        <Avatar className="bg-primary">
          {comment.author.fullName[0].toUpperCase()}
        </Avatar>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-primary font-semibold">
            {comment.author.fullName}
          </h1>
          <div className="text-xs text-gray-500 font-light">
            {getTimeDifference(comment.createdAt)}
          </div>
        </div>
        <p className="text-xs w-full py-2">{comment.content}</p>

        <div className="w-full relative">
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
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
