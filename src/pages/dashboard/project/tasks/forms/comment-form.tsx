import { Button, Input } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";

import queryKeys from "../../../../../constants/query-keys";
import projectTaskService from "../../../../../services/project-task-service";
import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import { useParams } from "react-router-dom";

interface CommentForm {
  projectTaskId: string;
  refetch: () => void;
}

interface CreateProjectTaskComment {
  content: string;
  projectTaskId: string;
  projectId: string;
}

const CommentForm = ({ projectTaskId, refetch }: CommentForm) => {
  const { projectId } = useParams();
  const { handleError } = useErrorHandler();
  const { authToken } = useUserInfo();
  const [value, setValue] = useState<string>();

  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.projectTask.createProjectTaskComment],
    mutationFn: ({ data }: { data: CreateProjectTaskComment }) =>
      projectTaskService().createProjectTaskComment({
        authToken,
        data,
      }),
    onSuccess: ({ data }) => {
      console.log(data);
      refetch();
    },
    onError: (error) => {
      console.error("ERROR :: create project task comment ::", error);
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
    };

    mutate({ data });

    setValue("");
  };

  return (
    <div className="w-full space-y-2">
      <Input.TextArea
        placeholder="Add comment here"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center justify-end">
        <Button
          className="px-6 ring-0 rounded-full"
          disabled={!value}
          type="primary"
          onClick={handleOnClick}
          loading={isLoading}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
