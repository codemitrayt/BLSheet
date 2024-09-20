import { TbTrash } from "react-icons/tb";
import { useMutation } from "react-query";

import { LuLoader } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { AssignUser } from "../../../../../types";
import queryKeys from "../../../../../constants/query-keys";

import projectTaskService from "../../../../../services/project-task-service";
import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

interface MemberCard {
  member: AssignUser;
  refetchProjectTasks: () => void;
  removeMember: (memberEmailId: string) => void;
  projectTaskId: string;
}

export interface AssignUserToProjectTask {
  memberEmailId: string;
  projectId: string;
  projectTaskId: string;
}

const MemberCard = ({
  member,
  refetchProjectTasks,
  removeMember,
  projectTaskId,
}: MemberCard) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const { projectId } = useParams();

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.projectTask.removeAssignUserFromProjectTask],
    mutationFn: ({ data }: { data: AssignUserToProjectTask }) =>
      projectTaskService().removeAssignedUserFormProjectTask({
        authToken,
        data,
      }),
    onSuccess: () => {
      refetchProjectTasks();
      removeMember(member.memberEmailId);
    },
    onError: (error) => {
      console.error(
        "ERROR :: remove assigned user from project task ::",
        error
      );
      handleError(error);
    },
    retry: false,
  });

  const handleRemoveMember = () => {
    mutate({
      data: {
        memberEmailId: member.memberEmailId,
        projectId: projectId as string,
        projectTaskId: projectTaskId,
      },
    });
  };

  return (
    <div className="flex items-center justify-between border px-2 py-1 shadow-sm bg-secondary">
      <span className="text-white">{member.memberEmailId}</span>
      <button
        className="text-red-500 hover:text-red-500/80 transition-all"
        onClick={handleRemoveMember}
      >
        {isLoading ? <LuLoader className="animate-spin" /> : <TbTrash />}
      </button>
    </div>
  );
};

export default MemberCard;
