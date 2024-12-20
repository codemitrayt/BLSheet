import { Button, Drawer } from "antd";
import { useState } from "react";

import { LuChevronRightCircle } from "react-icons/lu";
import CreateIssueForm from "../forms/create-issue-form";
import useAuth from "../../../../../hooks/useAuth";
import { UserRole } from "../../../../../types";

interface CreateIssue {
  refetch: () => void;
}

const CreateIssue = ({ refetch }: CreateIssue) => {
  const { user } = useAuth();
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div className="relative">
      <Button
        type="primary"
        className="ring-0"
        onClick={onOpenDrawer}
        disabled={user?.role === UserRole.GUEST}
      >
        New issue
      </Button>

      <Drawer
        width={600}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Create Issue</span>}
      >
        <CreateIssueForm onCloseDrawer={onCloseDrawer} refetch={refetch} />
      </Drawer>
    </div>
  );
};

export default CreateIssue;
