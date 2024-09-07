import { useState } from "react";
import { Drawer, Tooltip } from "antd";

import { TbEdit } from "react-icons/tb";
import { LuChevronRightCircle } from "react-icons/lu";

import UpdateTodoForm from "../forms/update-todo-form";
import { Todo } from "../../../../types";

interface UpdateTodoProps {
  todo: Todo;
  refetchTodoList: () => void;
}

const UpdateTodo = ({ todo, refetchTodoList }: UpdateTodoProps) => {
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div className="relative">
      <Tooltip title="Update Todo">
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
        <UpdateTodoForm
          todo={todo}
          refetchTodoList={refetchTodoList}
          onCloseDrawer={onCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default UpdateTodo;
