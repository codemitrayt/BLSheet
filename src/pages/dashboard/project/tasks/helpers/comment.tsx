import { Drawer } from "antd";
import { useState } from "react";

import { BiCommentDots } from "react-icons/bi";
import { LuChevronRightCircle } from "react-icons/lu";

const ProjectTaskComment = () => {
  const [drawerState, setDrawerState] = useState(false);
  const openDrawer = () => setDrawerState(true);
  const closeDrawer = () => setDrawerState(false);

  return (
    <div className="relative">
      <button
        onClick={openDrawer}
        className="text-primary hover:text-primary/80 transition-all flex items-center justify-center space-x-[2px]"
      >
        <BiCommentDots className="size-4" />
        <span className="text-sm">0</span>
      </button>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={closeDrawer}
        title={<span className="text-primary">Comment</span>}
      >
        <h1>Project task comment</h1>
      </Drawer>
    </div>
  );
};

export default ProjectTaskComment;
