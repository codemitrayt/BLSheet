import { TbTrash } from "react-icons/tb";
import { useMutation } from "react-query";

import { LuLoader } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { AssignUser, UserRole } from "../../../../../../types";
import queryKeys from "../../../../../../constants/query-keys";

import useAuth from "../../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../../hooks/useErrorHandler";
import issueService from "../../../../../../services/issue-service";
import { useIssueContext } from "../../../../../../providers/issue-provider";

interface MemberCard {
  member: AssignUser;
  removeMember: (memberEmialId: string) => void;
}

export interface AssignUserToProjectIssue {
  memberEmailId: string;
  projectId: string;
  issueId: string;
}

const MemberCard = ({ member, removeMember }: MemberCard) => {
  const { issue, refetchIssue } = useIssueContext();
  const { authToken, user } = useAuth();
  const { handleError } = useErrorHandler();
  const { projectId } = useParams();

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.issue.removeUser],
    mutationFn: ({ data }: { data: AssignUserToProjectIssue }) =>
      issueService.removeAssignedUserFormIssue({
        authToken,
        data,
      }),
    onSuccess: () => {
      refetchIssue();
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
    if (user?.role === UserRole.GUEST) {
      handleError(
        null,
        "This is a Guest Account - You Do Not Have Access to Delete"
      );
      return;
    }

    mutate({
      data: {
        memberEmailId: member.memberEmailId,
        projectId: projectId as string,
        issueId: issue?._id as string,
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
