import { Button, Form, Input, Select } from "antd";
import { useMutation } from "react-query";

import { Project } from "../../../../types";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import useUserInfo from "../../../../hooks/useUserInfo";
import projectService from "../../../../services/project-service";

interface CreateProjectFormProps {
  onCloseDrawer: () => void;
  refetchProjectList: () => void;
}

const CreateProjectForm = ({
  refetchProjectList,
  onCloseDrawer,
}: CreateProjectFormProps) => {
  const { authToken } = useUserInfo();
  const [form] = Form.useForm();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["create-project"],
    mutationFn: ({ data }: { data: Project }) =>
      projectService().createProject({ data, authToken }),
    onSuccess: () => {
      refetchProjectList();
      onCloseDrawer();
      form.resetFields();
    },
    onError: (error) => {
      console.error("ERROR :: create project ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="bg-turnary p-6 rounded-lg">
      <Form
        layout="vertical"
        form={form}
        onFinish={(data: Project) => {
          mutate({ data });
        }}
      >
        <Form.Item
          name="name"
          label={<span className="text-primary font-medium">Project Name</span>}
          rules={[{ required: true, message: "Name must be required" }]}
        >
          <Input.TextArea
            rows={2}
            placeholder="Title"
            showCount
            count={{ max: 70 }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-primary font-medium">
              Project Description
            </span>
          }
          rules={[{ required: true, message: "Description must be required" }]}
        >
          <Input.TextArea
            placeholder="Todo description"
            showCount
            count={{ max: 150 }}
          />
        </Form.Item>

        <Form.Item
          className="w-full"
          name="tags"
          label={<span className="text-primary font-medium">Project Tags</span>}
          required
        >
          <Select
            className="w-full"
            mode="tags"
            suffixIcon={null}
            placeholder="Project tags"
            maxCount={3}
          />
        </Form.Item>

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

export default CreateProjectForm;
