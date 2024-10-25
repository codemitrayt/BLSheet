import { Avatar, Divider } from "antd";
import { formatDistance } from "date-fns";

import { Comment } from "../../../../../../types";

interface CommentCard {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCard) => {
  return (
    <div className="">
      <Divider dashed type="vertical" className="border-zinc-300 h-5" />
      <div className="border rounded-md py-3 md:py-6">
        <div className="flex items-center justify-between w-full px-3">
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

        <div className="!text-xs mt-2 px-6 md:px-8">
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
