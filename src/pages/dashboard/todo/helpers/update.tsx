import { TbEdit } from "react-icons/tb";
import { useState } from "react";
import { Drawer, Tooltip } from "antd";

import { LuChevronRightCircle } from "react-icons/lu";

import UpdateTodoCard from "../cards/update-card";
import { Todo } from "../../../../types";

interface EditProps {
  todoList: Todo[];
  refetchTodoCard: () => void;
}

const UpdateTodo = ({ todoList, refetchTodoCard }: EditProps) => {
  const [drawerState, setDrawerState] = useState(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div>
      <Tooltip title="Update todo">
        <button
          onClick={onOpenDrawer}
          className="text-emerald-500 flex items-center justify-center hover:text-emerald-500/80 transition"
        >
          <TbEdit />
        </button>
      </Tooltip>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Update Todo</span>}
      >
        <UpdateTodoCard
          todo={todoList}
          refetchTodoCard={refetchTodoCard}
          onCloseDrawer={onCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default UpdateTodo;
