import { Drawer, Tag, Tooltip } from "antd";
import { useState } from "react";

import { Todo } from "../../../../types";
import { TODO_LEVEL_COLOR, TODO_STATUS_COLOR } from "../../../../constants";

import { GoEye } from "react-icons/go";
import { LuChevronRightCircle } from "react-icons/lu";

interface TodoDetailsDrawerProps {
  todo: Todo;
}

const TodoDetailsDrawer = ({ todo }: TodoDetailsDrawerProps) => {
  const [drawerState, setDrawerState] = useState(false);
  const openDrawer = () => setDrawerState(true);
  const closeDrawer = () => setDrawerState(false);

  return (
    <div className="relative">
      <Tooltip title="View Todo">
        <button
          onClick={openDrawer}
          className="flex items-center justify-center text-yellow-500 hover:text-yellow-500/80 transition-all"
        >
          <GoEye />
        </button>
      </Tooltip>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={closeDrawer}
        title={<span className="text-primary">Todo Details</span>}
      >
        <div className="bg-turnary p-6 rounded-lg space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Todo Title:</span>
            <h1 className="text-primary font-light">{todo.title}</h1>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Todo Description:</span>
            <h1 className="text-primary font-light">{todo.description}</h1>
          </div>
          <div className="flex space-x-2">
            <span className="font-medium">Todo Level:</span>
            <Tag
              className="!text-xs w-[80px] flex items-center justify-center rounded-full"
              color={TODO_LEVEL_COLOR[todo.level]}
            >
              {todo.level.toUpperCase()}
            </Tag>
          </div>
          <div className="flex space-x-2">
            <span className="font-medium">Todo Status:</span>
            <Tag
              className="!text-xs w-[100px] flex items-center justify-center rounded-full"
              color={TODO_STATUS_COLOR[todo.status]}
            >
              {todo.status.toUpperCase()}
            </Tag>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default TodoDetailsDrawer;
