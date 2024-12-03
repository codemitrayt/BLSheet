import { useState } from "react";
import { useMutation } from "react-query";
import { TbEdit } from "react-icons/tb";
import { Badge, Button, Drawer, Input, message, Select, Tooltip } from "antd";

import queryKeys from "../../../../../constants/query-keys";
import projectService from "../../../../../services/project-service";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import { MemberRoles, ProjectMember } from "../../../../../types";

interface UpdateMemberProps {
  member: ProjectMember;
  refetch: () => void;
}

const UpdateMember = ({ member, refetch }: UpdateMemberProps) => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const [modalState, setModalState] = useState(false);
  const [memberRole, setMemberRole] = useState<MemberRoles>(member.role);

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.project.updateProjectMemberRole],
    mutationFn: ({ data }: { data: { memberId: string; role: MemberRoles } }) =>
      projectService().updateProjectMemberRole({ authToken, data }),
    onSuccess: () => {
      refetch();
      setModalState(false);
      message.open({
        content: "Member updated successfully",
        type: "success",
        duration: 2,
        className: "absolute top-[40px] right-4",
      });
    },
    onError: (error) => {
      console.log("ERROR WHILE UPDATING MEMBER ROLE", error);
      handleError(error);
    },
  });

  return (
    <>
      <Tooltip title="Update Member" color="#2E667E">
        <button className="text-green-500" onClick={() => setModalState(true)}>
          <TbEdit className="size-4" />
        </button>
      </Tooltip>

      <Drawer
        open={modalState}
        onClose={() => setModalState(false)}
        title={<span className="text-primary">Update Member Details</span>}
      >
        <div className="bg-turnary rounded-md border p-3 space-y-3">
          <div>
            <h1 className="text-primary font-medium mb-2 pl-1">
              Member Email:
            </h1>
            <Input
              disabled
              value={member.memberEmailId}
              style={{ color: "#1A3845" }}
            />
          </div>

          <div>
            <h1 className="text-primary font-medium mb-2 pl-1">Member Role:</h1>
            <Select
              onChange={(value: MemberRoles) => setMemberRole(value)}
              className="w-[200px]"
              defaultValue={memberRole}
              options={[
                // {
                //   value: "owner",
                //   label: (
                //     <div className="flex items-center space-x-2">
                //       <Badge color="orange" /> <span>Owner</span>
                //     </div>
                //   ),
                // },
                {
                  value: "admin",
                  label: (
                    <div className="flex items-center space-x-2">
                      <Badge color="red" /> <span>Admin</span>
                    </div>
                  ),
                },
                {
                  value: "member",
                  label: (
                    <div className="flex items-center space-x-2">
                      <Badge color="blue" /> <span>Member</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div className="pt-5 flex items-center justify-end">
            <Button
              type="primary"
              className="ring-0 px-6 rounded-full"
              loading={isLoading}
              onClick={() =>
                mutate({ data: { memberId: member._id, role: memberRole } })
              }
            >
              Update Member
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default UpdateMember;
