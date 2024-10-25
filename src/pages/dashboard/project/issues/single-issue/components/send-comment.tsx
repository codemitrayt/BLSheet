import { useMutation } from "react-query";
import ReactQuill from "react-quill";
import issueService from "../../../../../../services/issue-service";
import useAuth from "../../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../../hooks/useErrorHandler";
import { LuLoader2 } from "react-icons/lu";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "../../../../../../utils";

interface SendComment {
  refetch: () => void;
}

const SendComment = ({ refetch }: SendComment) => {
  const { projectId, issueId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const [value, setValue] = useState("");

  const { isLoading, mutate } = useMutation({
    mutationKey: ["POST_COMMENT"],
    mutationFn: ({
      data,
    }: {
      data: {
        content: string;
        projectId: string;
        issueId: string;
      };
    }) => issueService.createIssueComment({ authToken, data }),
    onSuccess: () => {
      refetch();
      setValue("");
    },
    onError: (error) => {
      console.error("ERROR :: POST_COMMENT ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleOnClick = () => {
    if (!value) return;
    mutate({
      data: {
        content: value,
        issueId: issueId as string,
        projectId: projectId as string,
      },
    });
  };

  return (
    <div className="mt-3">
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

export default SendComment;
