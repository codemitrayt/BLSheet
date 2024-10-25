import { Spin } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Comment } from "../../../../../../types";
import CommentCard from "../cards/comment-card";
import SendComment from "./send-comment";
import queryKeys from "../../../../../../constants/query-keys";
import issueService from "../../../../../../services/issue-service";
import useAuth from "../../../../../../hooks/useAuth";

const Comments = () => {
  const { issueId } = useParams();
  const { authToken } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);

  const { isLoading, refetch } = useQuery({
    queryKey: [queryKeys.issue.getComments],
    queryFn: () =>
      issueService.getIssueComments({
        authToken,
        data: { issueId },
      }),
    onSuccess: ({ data }) => {
      const comments = data?.message?.issue?.comments || [];
      setComments(comments);
    },
    onError: (error) => {
      console.error("ERROR :: getIssueComments ::", error);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spin />
      </div>
    );
  }

  return (
    <div className="prose prose-stone !prose-sm max-w-full">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment._id} />
      ))}
      <SendComment refetch={refetch} />
    </div>
  );
};

export default Comments;
