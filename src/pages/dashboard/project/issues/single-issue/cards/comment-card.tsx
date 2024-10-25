import { Avatar, Divider } from "antd";
import { formatDistance } from "date-fns";

import { Comment } from "../../../../../../types";

interface CommentCard {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCard) => {
  return (
    <div className="">
      <div className="h-10 flex space-x-2">
        <Divider dashed type="vertical" className="h-full border-zinc-300" />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-1">
            <Avatar className="bg-primary !text-xs" size={22}>
              {comment.author.fullName[0].toUpperCase()}
            </Avatar>
            <span className="text-xs text-primary font-bold">
              {comment.author.fullName}
            </span>
          </div>
          <div className="text-xs text-zinc-700">
            {formatDistance(comment.createdAt, new Date())} ago
          </div>
        </div>
      </div>
      <div className="!text-xs border p-3 rounded-md">
        <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      </div>
    </div>
  );
};

export default CommentCard;
