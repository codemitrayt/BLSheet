import { useMutation } from "react-query";
import { LuLoader2 } from "react-icons/lu";
import { IoRemoveCircleOutline } from "react-icons/io5";

import { ProjectMember } from "../../../../../types";
import projectService from "../../../../../services/project-service";
import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import ConfirmationPopUp from "../../../../../components/ui/confirmation-popup";

interface RemoveMember {
  projectMember: ProjectMember;
  refetchProjectMembers: () => void;
}

const RemoveMember = ({
  projectMember,
  refetchProjectMembers,
}: RemoveMember) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["removeMember"],
    mutationFn: () =>
      projectService().removeProjectMember({
        authToken,
        params: { objectId: projectMember._id },
      }),
    onSuccess: () => {
      refetchProjectMembers();
    },
    onError: (error) => {
      console.log("Error: Remove Member ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="flex items-center space-x-2">
      <ConfirmationPopUp
        title="Remove Member from this Project"
        description="Are you sure to remove this member?"
        fn={() => mutate()}
        isLoading={isLoading}
        icon={
          <div className="flex items-center justify-center h-5 mr-2">
            <IoRemoveCircleOutline className="text-red-500" />
          </div>
        }
      >
        <button className="text-xs border px-3 py-1 rounded-full space-x-1 border-red-500 flex items-center justify-center text-red-500 transition-all hover:bg-red-500 hover:text-white">
          {isLoading ? (
            <LuLoader2 className="animate-spin" />
          ) : (
            <IoRemoveCircleOutline />
          )}
          <span>Remove</span>
        </button>
      </ConfirmationPopUp>
    </div>
  );
};

export default RemoveMember;