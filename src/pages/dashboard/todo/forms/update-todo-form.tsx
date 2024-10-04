import { Button, Form, Input, Select } from "antd";
import { useMutation } from "react-query";
import { useEffect } from "react";

import { Todo, UserRole } from "../../../../types";
import { TODO_LEVELS, TODO_STATUS } from "../../../../constants";

import useErrorHandler from "../../../../hooks/useErrorHandler";
import useAuth from "../../../../hooks/useAuth";
import todoService from "../../../../services/todo-service";

interface UpdateTodoFormProps {
  todo: Todo;
  refetchTodoList: () => void;
  onCloseDrawer: () => void;
}

const UpdateTodoForm = ({
  refetchTodoList,
  onCloseDrawer,
  todo,
}: UpdateTodoFormProps) => {
  const [form] = Form.useForm();
  const { authToken, user } = useAuth();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    form.setFieldsValue({ ...todo });
  }, [todo]);

  const { isLoading, mutate: updateTodo } = useMutation({
    mutationKey: ["update-todo"],
    mutationFn: ({ data }: { data: Todo }) =>
      todoService().updateTodo({
        data,
        authToken,
        params: { objectId: todo._id },
      }),
    onSuccess: () => {
      refetchTodoList();
      onCloseDrawer();
      form.resetFields();
    },
    onError: (error) => {
      console.error("ERROR :: update todo ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="bg-turnary p-6 rounded-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={(data: Todo) => {
          if (user?.role === UserRole.GUEST) {
            handleError(
              null,
              "This is a Guest Account - You Do Not Have Access to Update"
            );
            return;
          }
          updateTodo({ data });
        }}
      >
        <Form.Item
          name="title"
          label={<span className="text-primary font-medium">Todo Title</span>}
          rules={[{ required: true, message: "Todo Title be required" }]}
        >
          <Input placeholder="Todo Title" showCount count={{ max: 50 }} />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-primary font-medium">Todo Description</span>
          }
          rules={[{ required: true, message: "Description must be required" }]}
        >
          <Input.TextArea
            placeholder="Todo description"
            showCount
            count={{ max: 100 }}
          />
        </Form.Item>

        <div className="flex items-center space-x-8">
          <Form.Item
            className="w-full"
            name="level"
            label={<span className="text-primary font-medium">Todo Level</span>}
          >
            <Select options={TODO_LEVELS} className="w-full" />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="status"
            label={
              <span className="text-primary font-medium">Todo Status</span>
            }
          >
            <Select options={TODO_STATUS} className="w-full" />
          </Form.Item>
        </div>

        <div className="flex items-center justify-end">
          <Button
            htmlType="submit"
            className="px-6 rounded-full ring-0"
            type="primary"
            loading={isLoading}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateTodoForm;
