import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { Divider, Spin } from "antd";

import { Comment } from "../../../../../../types";
import useAuth from "../../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../../hooks/useErrorHandler";
import projectTaskService from "../../../../../../services/project-task-service";
import queryKeys from "../../../../../../constants/query-keys";

import CommentCard from "./comment-card";
import CommentForm from "../../forms/comment-form";

const TaskComment = () => {
  const { taskId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const [comments, setComments] = useState<Comment[]>([]);

  const { isLoading, refetch } = useQuery({
    queryKey: [queryKeys.projectTask.getProjectTaskComments, taskId],
    queryFn: () =>
      projectTaskService().getProjectTaskComments({
        authToken,
        data: { projectTaskId: taskId },
      }),
    onSuccess: ({ data }) => {
      const comments = data?.message?.projectTask?.comments || [];
      setComments(comments);
    },
    onError: (error) => {
      console.error("ERROR :: get project task comments ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="py-3 flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="relative">
      {comments.map((comment) => (
        <CommentCard
          refetchComments={refetch}
          comment={comment}
          key={comment._id}
        />
      ))}

      <Divider className="border-primary" dashed />
      <div className="mt-4">
        <CommentForm projectTaskId={taskId as string} refetch={refetch} />
      </div>
    </div>
  );
};

export default TaskComment;
