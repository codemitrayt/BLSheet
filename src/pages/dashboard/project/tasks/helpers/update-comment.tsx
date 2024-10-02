import { Button, Input } from "antd";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TbEdit } from "react-icons/tb";

import queryKeys from "../../../../../constants/query-keys";
import projectTaskService from "../../../../../services/project-task-service";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import { Comment } from "../../../../../types";

interface RequestData {
  data: {
    projectId: string;
    projectTaskId: string;
    commentId: string;
    content: string;
  };
}

interface UpdateComment {
  comment: Comment;
  projectTaskId: string;
  refetchProjectComment: () => void;
}

const UpdateComment = ({
  comment,
  projectTaskId,
  refetchProjectComment,
}: UpdateComment) => {
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const [value, setValue] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setValue(comment.content);
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.projectTask.updateProjectTaskComment],
    mutationFn: ({ data }: RequestData) =>
      projectTaskService().updateProjectTaskComment({ data, authToken }),
    onSuccess: () => {
      setIsEdit(false);
      refetchProjectComment();
    },
    onError: (error) => {
      console.error("ERROR :: update comment ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleOnClick = () => {
    if (!value) return;

    const data = {
      projectTaskId,
      projectId: projectId as string,
      content: value,
      commentId: comment._id,
    };

    mutate({ data });
  };

  return (
    <div>
      <button
        onClick={() => setIsEdit(true)}
        className="text-emerald-500 hover:text-emerald-500/80 flex items-center justify-center space-x-1"
      >
        <TbEdit />
        <span className="text-xs">Edit</span>
      </button>

      {isEdit && (
        <div className="w-full space-y-1 absolute inset-0 h-full bg-turnary">
          <Input.TextArea
            placeholder="Add comment here"
            rows={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex items-center justify-end space-x-2">
            <Button
              size="small"
              className="px-6 rounded-full ring-0 text-xs"
              onClick={() => setIsEdit(false)}
            >
              Close
            </Button>
            <Button
              size="small"
              className="px-6 rounded-full ring-0 text-xs"
              disabled={!value}
              type="primary"
              onClick={handleOnClick}
              loading={isLoading}
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateComment;
