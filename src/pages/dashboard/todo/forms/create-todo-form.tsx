import { Button, Form, Input, Select } from "antd";
import { useMutation } from "react-query";

import { Todo } from "../../../../types";
import { TODO_LEVELS, TODO_STATUS } from "../../../../constants";

import useErrorHandler from "../../../../hooks/useErrorHandler";
import todoService from "../../../../services/todo-service";
import useAuth from "../../../../hooks/useAuth";

interface CreateTodoFormProps {
  onCloseDrawer: () => void;
  refetchTodoList: () => void;
  clearParams: () => void;
}

const CreateTodoForm = ({
  refetchTodoList,
  onCloseDrawer,
  clearParams,
}: CreateTodoFormProps) => {
  const { authToken } = useAuth();
  const [form] = Form.useForm();
  const { handleError } = useErrorHandler();
  const { isLoading, mutate: createTodo } = useMutation({
    mutationKey: ["create-todo"],
    mutationFn: ({ data }: { data: Todo }) =>
      todoService().createTodo({ data, authToken }),
    onSuccess: () => {
      refetchTodoList();
      onCloseDrawer();
      form.resetFields();
      clearParams();
    },
    onError: (error) => {
      console.error("ERROR :: create Todo ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="bg-turnary p-6 rounded-lg">
      <Form
        layout="vertical"
        form={form}
        initialValues={{ level: "easy", status: "pending" }}
        onFinish={(data: Todo) => {
          createTodo({ data });
        }}
      >
        <Form.Item
          name="title"
          label={<span className="text-primary font-medium">Todo Title</span>}
          rules={[{ required: true, message: "Title must be required" }]}
        >
          <Input placeholder="Title" showCount count={{ max: 50 }} />
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
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTodoForm;
