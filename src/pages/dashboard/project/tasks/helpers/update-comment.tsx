import { Button, Input } from "antd";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TbEdit } from "react-icons/tb";

import queryKeys from "../../../../../constants/query-keys";
import projectTaskService from "../../../../../services/project-task-service";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import { Comment, UserRole } from "../../../../../types";

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
  const { authToken, user } = useAuth();
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

    if (user?.role === UserRole.GUEST) {
      handleError(
        null,
        "This is a Guest Account - You Do Not Have Access to Update Comment"
      );
      return;
    }

    mutate({ data });
  };

  return (
    <>
      <button
        onClick={() => setIsEdit(true)}
        className="text-emerald-500 top-0 hover:text-emerald-500/80 flex items-center justify-center space-x-1 absolute right-[28px]"
      >
        <TbEdit />
        <span className="text-xs">Edit</span>
      </button>

      {isEdit && (
        <div className="w-full space-y-2 pt-8">
          <Input.TextArea
            placeholder="Update comment"
            rows={2}
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
    </>
  );
};

export default UpdateComment;
