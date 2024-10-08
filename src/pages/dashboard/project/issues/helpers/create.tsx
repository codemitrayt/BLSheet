import { Button, Drawer } from "antd";
import { useState } from "react";

import { LuChevronRightCircle } from "react-icons/lu";
import CreateIssueForm from "../forms/create-issue-form";

const CreateIssue = () => {
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div className="relative">
      <Button type="primary" className="ring-0" onClick={onOpenDrawer}>
        New issue
      </Button>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Create Project</span>}
      >
        <CreateIssueForm onCloseDrawer={onCloseDrawer} />
      </Drawer>
    </div>
  );
};

export default CreateIssue;
