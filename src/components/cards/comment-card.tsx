import { Avatar } from "antd";

import { AiOutlineComment } from "react-icons/ai";
import { RiReplyLine } from "react-icons/ri";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Comment } from "../../types";
import { useProjectContext } from "../../providers/project-provider";

interface CommentCard {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCard) => {
  const { isAdmin } = useProjectContext();

  return (
    <div className="relative w-full flex gap-1 border-b pb-5">
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
              <button className="text-emerald-500 hover:text-emerald-500/80 flex items-center justify-center space-x-1">
                <TbEdit />
                <span className="text-xs">Edit</span>
              </button>
              <div className="h-[15px] w-[1px] bg-gray-500" />
              <button className="text-red-500 hover:text-red-500/80">
                <TbTrash />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
