import {
  Button,
  Form,
  Input,
  Select,
} from "antd";

import { useMutation } from "react-query";

import { useEffect } from "react";

import { Todo } from "../../../../types";
import { TODO_CARD_LEVEL_TYPES } from "../../../../constants"
import { TODO_CARD_STATUS_TYPES } from "../../../../constants"
import useErrorHandler from "../../../../hooks/useErrorHandler";
import useUserInfo from "../../../../hooks/useUserInfo";
import todoService from "../../../../services/todo-service";

interface EditTodoFormProps {
  refetchTodoCard: () => void;
  onCloseDrawer: () => void;
  todo: Todo;
}

const UpdateTodoCard = ({
  refetchTodoCard,
  onCloseDrawer,
  todo,
}: EditTodoFormProps) => {
  const [form] = Form.useForm();
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    form.setFieldsValue({ ...todo });
  }, [todo]);

  const { isLoading, mutate: createTodoCard } = useMutation({
    mutationKey: ["update-todo-card"],
    mutationFn: ({ data }: { data: Todo }) =>
      todoService().updateTodoList({
        data,
        authToken,
      }),
    onSuccess: () => {
      refetchTodoCard();
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
        onFinish={( data: Todo ) => createTodoCard({ data })}
      >
        <Form.Item
          name="title"
          label={<span className="text-primary font-medium">Todo Title</span>}
          rules={[{ required: true, message: "Todo Title be required" }]}
        >
          <Input placeholder="Todo Title" />
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
            name="level"
            label={<span className="text-primary font-medium">Todo Level</span>}
          >
            <Select
              // onChange={handleOnChange}
              options={TODO_CARD_LEVEL_TYPES}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="status"
            label={<span className="text-primary font-medium">Todo Status</span>}
          >
            <Select
              // onChange={handleOnChange}
              options={TODO_CARD_STATUS_TYPES}
              className="w-full"
            />
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

export default UpdateTodoCard;
