import { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { Comment } from "../../../../../types";
import queryKeys from "../../../../../constants/query-keys";

import CommentCard from "../cards/comment-card";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectTaskService from "../../../../../services/project-task-service";
import { useProjectContext } from "../../../../../providers/project-provider";

interface ShowReplies {
  commentId: string;
  replyCount: number;
  projectTaskId: string;
}

const ShowReplies = ({ commentId, replyCount, projectTaskId }: ShowReplies) => {
  const { isAdmin } = useProjectContext();
  const { authToken } = useAuth();
  const { projectId } = useParams();
  const { handleError } = useErrorHandler();

  const [replies, setReplies] = useState<Comment[]>([]);
  const [isShow, setIsShow] = useState(false);

  const { mutate } = useMutation({
    mutationKey: [queryKeys.projectTask.getProjectTaskCommentReplies],
    mutationFn: ({ data }: { data: { commentId: string } }) =>
      projectTaskService().getProjectTaskCommentReplies({ data, authToken }),
    onSuccess: ({ data }) => {
      const replies = data?.message?.projectTaskComment?.replies || [];
      setReplies(replies);
    },
    onError: (error) => {
      console.error("ERROR :: get project task comment replies ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <>
      {!!replyCount && (
        <button
          onClick={() => {
            if (!isShow) mutate({ data: { commentId } });
            setIsShow((prev) => !prev);
          }}
          className="text-primary top-0 hover:text-primary/80 flex items-center justify-center space-x-1 absolute right-[160px]"
        >
          <AiOutlineComment />
          <span className="text-xs">
            {isShow ? "Hide" : "Show"} {replyCount}{" "}
            {replyCount == 1 ? "Reply" : "Replies"}
          </span>
        </button>
      )}

      {isShow && (
        <div className="pt-8 space-y-2">
          {replies.map((reply) => (
            <CommentCard
              key={reply._id}
              isReply={true}
              projectId={projectId as string}
              projectTaskId={projectTaskId}
              isAdmin={isAdmin}
              comment={reply}
              refetchComments={() => mutate({ data: { commentId } })}
              parentCommentId={commentId}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ShowReplies;
