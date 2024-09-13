import { Modal, Button, Input, Form } from "antd";
import { useState } from "react";

import { VscAdd } from "react-icons/vsc";

interface InviteMemberPopupProps {
  projectName: string;
}

const InviteMemberPopup = ({ projectName }: InviteMemberPopupProps) => {
  const [modalState, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const openModal = () => setModalState(true);

  return (
    <div className="relative">
      <Button icon={<VscAdd />} onClick={openModal}>
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
        <Form layout="vertical" className="mt-4">
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
            <Button type="primary" htmlType="submit" className="ring-0">
              Invite
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberPopup;
