import { Button, Input } from "antd";
import { useMutation } from "react-query";
import { useState } from "react";
import { RiReplyLine } from "react-icons/ri";

import useAuth from "../../../../../hooks/useAuth";
import queryKeys from "../../../../../constants/query-keys";
import projectTaskService from "../../../../../services/project-task-service";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

interface ReplyComment {
  commentId: string;
  refecthComments: () => void;
}

interface RequestData {
  data: {
    commentId: string;
    content: string;
  };
}

const ReplyComment = ({ refecthComments, commentId }: ReplyComment) => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const [value, setValue] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.projectTask.replyProjectTaskComment],
    mutationFn: ({ data }: RequestData) =>
      projectTaskService().replyToProjectTaskComment({ data, authToken }),
    onSuccess: () => {
      setIsEdit(false);
      refecthComments();
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
      content: value,
      commentId: commentId,
    };

    mutate({ data });
  };

  return (
    <>
      <button
        onClick={() => setIsEdit(true)}
        className="text-primary top-0 hover:text-primary/80 flex items-center justify-center space-x-1 absolute right-[90px]"
      >
        <RiReplyLine />
        <span className="text-xs">Reply</span>
      </button>

      {isEdit && (
        <div className="w-full space-y-2 pt-8">
          <Input.TextArea
            placeholder="Reply to comment"
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
              Reply
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyComment;
