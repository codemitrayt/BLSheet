import { Drawer, Spin, Tooltip } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";

import { BiCommentDots } from "react-icons/bi";
import { LuChevronRightCircle } from "react-icons/lu";

import { Comment } from "../../../../../types";
import CommentForm from "../forms/comment-form";

import CommentCard from "../cards/comment-card";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

import queryKeys from "../../../../../constants/query-keys";
import projectTaskService from "../../../../../services/project-task-service";
import { useProjectContext } from "../../../../../providers/project-provider";

interface ProjectTaskComment {
  projectTaskId: string;
  count: number;
}

const ProjectTaskComment = ({ projectTaskId, count }: ProjectTaskComment) => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { projectId } = useParams();
  const { isAdmin } = useProjectContext();

  const [comments, setComments] = useState<Comment[]>([]);
  const [drawerState, setDrawerState] = useState(false);
  const openDrawer = () => {
    mutate();
    setDrawerState(true);
  };
  const closeDrawer = () => setDrawerState(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.projectTask.getProjectTaskComments, projectTaskId],
    mutationFn: () =>
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
        {isLoading ? (
          <div className="py-8 flex items-center justify-center">
            <Spin />
          </div>
        ) : (
          <>
            <div className="space-y-4 h-[calc(100vh_-240px)] overflow-auto border rounded-lg p-4 bg-turnary">
              {comments.map((comment) => (
                <CommentCard
                  isAdmin={isAdmin}
                  comment={comment}
                  key={comment._id}
                  projectId={projectId!}
                  projectTaskId={projectTaskId}
                  refetchComments={mutate}
                />
              ))}
            </div>

            <div className="mt-4">
              <CommentForm projectTaskId={projectTaskId} refetch={mutate} />
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default ProjectTaskComment;
