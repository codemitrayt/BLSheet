import { Drawer, Spin, Tooltip } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";

import { BiCommentDots } from "react-icons/bi";
import { LuChevronRightCircle } from "react-icons/lu";

import CommentForm from "../forms/comment-form";
import CommentCard from "../../../../../components/cards/comment-card";
import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

import queryKeys from "../../../../../constants/query-keys";
import projectTaskService from "../../../../../services/project-task-service";
import { Comment } from "../../../../../types";

interface ProjectTaskComment {
  projectTaskId: string;
  count: number;
}

const ProjectTaskComment = ({ projectTaskId, count }: ProjectTaskComment) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const [comments, setComments] = useState<Comment[]>([]);
  const [drawerState, setDrawerState] = useState(false);
  const openDrawer = () => setDrawerState(true);
  const closeDrawer = () => setDrawerState(false);

  const { isLoading, refetch } = useQuery({
    queryKey: [queryKeys.projectTask.getProjectTaskComments],
    queryFn: () =>
      projectTaskService().getProjectTaskComments({
        authToken,
        data: { projectTaskId },
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
      <div className="flex items-center justify-center py-16">
        <Spin />
      </div>
    );
  }

  return (
    <div className="relative">
      <Tooltip title="Comments">
        <button
          onClick={openDrawer}
          className="text-primary hover:text-primary/80 transition-all flex items-center justify-center space-x-[2px]"
        >
          <BiCommentDots className="size-4" />
          <span className="text-sm">{count}</span>
        </button>
      </Tooltip>

      <Drawer
        width={500}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={closeDrawer}
        title={<span className="text-primary">Comment</span>}
      >
        <div className="space-y-4 h-[calc(100vh_-240px)] overflow-auto border rounded-lg p-4 bg-turnary">
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment._id} />
          ))}
        </div>

        <div className="mt-4">
          <CommentForm projectTaskId={projectTaskId} refetch={refetch} />
        </div>
      </Drawer>
    </div>
  );
};

export default ProjectTaskComment;
