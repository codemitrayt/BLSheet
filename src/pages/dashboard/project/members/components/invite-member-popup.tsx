import { useState } from "react";
import { useMutation } from "react-query";
import { Modal, Button, Input, Form } from "antd";

import { VscAdd } from "react-icons/vsc";

import { UserRole } from "../../../../../types";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectService from "../../../../../services/project-service";

interface InviteMemberPopupProps {
  projectName: string;
  projectId: string;
  refetchProjectMembers: () => void;
}

const InviteMemberPopup = ({
  projectName,
  projectId,
  refetchProjectMembers,
}: InviteMemberPopupProps) => {
  const [form] = Form.useForm();
  const { authToken, user } = useAuth();
  const { handleError } = useErrorHandler();

  const [modalState, setModalState] = useState(false);
  const closeModal = () => {
    setModalState(false);
    form.resetFields();
  };
  const openModal = () => setModalState(true);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["invite-member"],
    mutationFn: ({ data }: { data: { email: string; projectId: string } }) =>
      projectService().inviteTeamMember({ data, authToken }),
    onSuccess: () => {
      closeModal();
      form.resetFields();
      refetchProjectMembers();
    },
    onError: (error) => {
      console.log("ERROR :: invite members ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="relative w-full sm:w-fit">
      <Button
        icon={<VscAdd />}
        onClick={openModal}
        disabled={isLoading}
        className="w-full"
      >
        Invite
      </Button>

      <Modal
        width={600}
        onCancel={closeModal}
        open={modalState}
        onClose={closeModal}
        footer={[]}
        title={
          <span className="text-primary">{`Invite member to ${projectName} project`}</span>
        }
      >
        <p>Enter the email address of the member you want to invite.</p>
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          onFinish={(values) => {
            if (user?.role === UserRole.GUEST) {
              handleError(
                null,
                "This is a Guest Account - You Do Not Have Access to Invite Members"
              );
              return;
            }

            mutate({ data: { email: values.email, projectId } });
          }}
        >
          <Form.Item
            name="email"
            label={
              <span className="text-primary pl-1">
                Enter member email address
              </span>
            }
            rules={[
              { required: true, message: "Please enter member email address" },
              { type: "email", message: "Please enter valid email address" },
            ]}
          >
            <Input
              type="email"
              placeholder="Member email address"
              className="w-full"
            />
          </Form.Item>
          <div className="flex items-center justify-end mt-4 space-x-4">
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="ring-0"
              loading={isLoading}
            >
              Invite
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberPopup;
