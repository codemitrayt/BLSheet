import { Avatar } from "antd";

import { AiOutlineComment } from "react-icons/ai";
import { RiReplyLine } from "react-icons/ri";

import { Comment } from "../../../../../types";
import DeleteComment from "../helpers/delete-comment";
import UpdateComment from "../helpers/update-comment";

interface CommentCard {
  comment: Comment;
  isAdmin: boolean;
  projectId: string;
  projectTaskId: string;
  refetchComments: () => void;
}

const CommentCard = ({
  comment,
  isAdmin,
  projectId,
  projectTaskId,
  refetchComments,
}: CommentCard) => {
  return (
    <div className="relative w-full flex gap-1 border-b border-primary pb-7">
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
          <div className="text-xs text-gray-500 font-light">1 day ago</div>
        </div>
        <p className="text-xs w-full py-2">{comment.content}</p>
        <div className="flex items-center justify-end space-x-2 mt-3">
          <button className="text-primary hover:text-primary/80 flex items-center justify-center space-x-1">
            <AiOutlineComment />
            <span className="text-xs">Show 5 Replies</span>
          </button>
          <div className="h-[15px] w-[1px] bg-gray-500" />
          <button className="text-primary hover:text-primary/80 flex items-center justify-center space-x-1">
            <RiReplyLine />
            <span className="text-xs">Reply</span>
          </button>

          {(comment.isCreator || isAdmin) && (
            <>
              <div className="h-[15px] w-[1px] bg-gray-500" />
              <UpdateComment
                comment={comment}
                projectTaskId={projectTaskId}
                refetchProjectComment={refetchComments}
              />
              <div className="h-[15px] w-[1px] bg-gray-500" />
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
