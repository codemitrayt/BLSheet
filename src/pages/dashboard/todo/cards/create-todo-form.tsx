import { Button, Form, Input, Select } from "antd";
import { useMutation } from "react-query";
import { Todo } from "../../../../types";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import todoService from "../../../../services/todo-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import {
  BL_TODO_LEVEL_TYPES,
  BL_TODO_STATUS_TYPES,
} from "../../../../constants";

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
  const { authToken } = useUserInfo();
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
        onFinish={(data: Todo) => {
          console.log("Form Data:", data);
          createTodo({ data });
        }}
      >
        <Form.Item
          name="title"
          label={<span className="text-primary font-medium">Title</span>}
          rules={[{ required: true, message: "Title must be required" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-primary font-medium">Todo Description</span>
          }
          rules={[{ required: true, message: "Description must be required" }]}
        >
          <Input.TextArea placeholder="Todo description" />
        </Form.Item>

        <div className="flex items-center space-x-8">
          <Form.Item
            className="w-full"
            name="status"
            label={<span className="text-primary font-medium">Status</span>}
          >
            <Select options={BL_TODO_STATUS_TYPES} className="w-full" />
          </Form.Item>
        </div>
        <div className="flex items-center space-x-8">
          <Form.Item
            className="w-full"
            name="level"
            label={<span className="text-primary font-medium">Level</span>}
          >
            <Select options={BL_TODO_LEVEL_TYPES} className="w-full" />
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
