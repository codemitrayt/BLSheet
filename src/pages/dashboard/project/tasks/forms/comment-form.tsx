import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { LuLoader2 } from "react-icons/lu";

import queryKeys from "../../../../../constants/query-keys";
import projectTaskService from "../../../../../services/project-task-service";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import { cn } from "../../../../../utils";

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
  const { authToken } = useAuth();
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
      <ReactQuill value={value} onChange={(value) => setValue(value.trim())} />
      <div className="flex items-center justify-end mt-2">
        <button
          disabled={!value}
          onClick={handleOnClick}
          className={cn(
            "ring-0 space-x-1 bg-emerald-600 flex items-center justify-center text-white hover:bg-emerald-600/70 rounded-md px-3 py-1 w-fit",
            !value &&
              "bg-emerald-600/50 cursor-not-allowed hover:bg-emerald-600/50"
          )}
        >
          {isLoading && <LuLoader2 className="animate-spin" />}
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
