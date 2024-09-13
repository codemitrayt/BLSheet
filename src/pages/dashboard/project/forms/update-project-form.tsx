import { Button, Form, Input, Select } from "antd";
import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import { useMutation } from "react-query";
import projectService from "../../../../services/project-service";
import { Project } from "../../../../types";
import { useEffect } from "react";

interface UpdateProjectFormProps {
  project: Project;
  refetchProjectList: () => void;
  onCloseDrawer: () => void;
}

const UpdateProjectForm = ({
  project,
  refetchProjectList,
  onCloseDrawer,
}: UpdateProjectFormProps) => {
  const [form] = Form.useForm();
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  useEffect(() => {
    form.setFieldsValue({ ...project });
  }, [project]);

  const { isLoading, mutate: updateProject } = useMutation({
    mutationKey: ["update-project"],
    mutationFn: ({ data }: { data: Project }) =>
      projectService().updateProject({
        data,
        authToken,
        params: { objectId: project._id },
      }),
    onSuccess: () => {
      refetchProjectList();
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
    <div>
      <div className="bg-turnary p-6 rounded-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={(data: Project) => updateProject({ data })}
        >
          <Form.Item
            name="name"
            label={<span className="text-primary font-medium">Todo Title</span>}
            rules={[{ required: true, message: "project name be required" }]}
          >
            <Input placeholder="project name" showCount count={{ max: 50 }} />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="text-primary font-medium">
                project Description
              </span>
            }
            rules={[
              { required: true, message: "Description must be required" },
            ]}
          >
            <Input.TextArea
              placeholder="project description"
              showCount
              count={{ max: 100 }}
            />
          </Form.Item>

          <div className="flex items-center space-x-8">
            <Form.Item
              className="w-full"
              name="tags"
              label={<span className="text-primary font-medium">Tags</span>}
            >
              <Select
                className="w-full"
                mode="tags"
                placeholder="Project tags"
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
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProjectForm;
