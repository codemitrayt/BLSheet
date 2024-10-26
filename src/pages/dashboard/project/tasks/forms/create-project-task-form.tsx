import { Button, DatePicker, Form, Input, Select } from "antd";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
// import ReactQuill from "react-quill";

import SubtaskForm from "./subtask-form";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectTaskService from "../../../../../services/project-task-service";

import { ProjectTask } from "../../../../../types";
import { TASK_PRIORITY, TASK_STATUS } from "../../../../../constants";

interface CreateProjectTaskFormProps {
  onCloseDrawer: () => void;
  refetchProjectTaskList: () => void;
}

const CreateProjectTaskForm = ({
  refetchProjectTaskList,
  onCloseDrawer,
}: CreateProjectTaskFormProps) => {
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const [form] = Form.useForm();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["create-project-task"],
    mutationFn: ({ data }: { data: ProjectTask }) =>
      projectTaskService().createProjectTask({ data, authToken }),
    onSuccess: () => {
      refetchProjectTaskList();
      onCloseDrawer();
      form.resetFields();
    },
    onError: (error) => {
      console.error("ERROR :: create project task ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="bg-turnary p-6 rounded-lg">
      <Form
        layout="vertical"
        form={form}
        initialValues={{ priority: "low", status: "todo" }}
        onFinish={(data) => {
          const values = {
            ...data,
            projectId,
            startDate: data.date[0].toISOString(),
            endDate: data.date[1].toISOString(),
          };
          mutate({ data: values });
        }}
      >
        <Form.Item
          name="title"
          label={<span className="text-primary font-medium">Title</span>}
          rules={[{ required: true, message: "Title must be required" }]}
        >
          <Input.TextArea
            rows={2}
            placeholder="Title"
            showCount
            count={{ max: 100 }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-primary font-medium">
              Description (optional)
            </span>
          }
          // rules={[{ required: true, message: "Description must be required" }]}
        >
          {/* <ReactQuill theme="snow" /> */}
          <Input.TextArea
            placeholder="Description"
            showCount
            count={{ max: 150 }}
            rows={3}
          />
        </Form.Item>
        <div className="flex items-center space-x-8">
          <Form.Item
            className="w-full"
            name="status"
            label={<span className="text-primary font-medium">Status</span>}
          >
            <Select options={TASK_STATUS} className="w-full" />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="priority"
            label={<span className="text-primary font-medium">Priority</span>}
          >
            <Select options={TASK_PRIORITY} className="w-full" />
          </Form.Item>
        </div>
        <div className="flex items-center space-x-8">
          <Form.Item
            className="w-full"
            name="date"
            label={<span className="text-primary font-medium">Date</span>}
            rules={[{ required: true, message: "Date must be required" }]}
          >
            <DatePicker.RangePicker
              className="w-full"
              placeholder={["Start date", "End date"]}
            />
          </Form.Item>
        </div>
        <Form.Item
          className="w-full"
          name="tags"
          label={
            <span className="text-primary font-medium">Tags (optional)</span>
          }
        >
          <Select
            className="w-full"
            mode="tags"
            placeholder="Tags"
            suffixIcon={null}
            maxCount={3}
          />
        </Form.Item>

        <SubtaskForm />

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

export default CreateProjectTaskForm;
