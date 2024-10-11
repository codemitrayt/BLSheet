import { Button, Form, Input, Select } from "antd";
import { useMutation } from "react-query";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

import queryKeys from "../../../../../constants/query-keys";
import issueService from "../../../../../services/issue-service";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

interface CreateIssueForm {
  refetch: () => void;
  onCloseDrawer: () => void;
}

const CreateIssueForm = ({ onCloseDrawer, refetch }: CreateIssueForm) => {
  const [form] = Form.useForm();
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.issue.createIssue],
    mutationFn: ({ data }: { data: { title: string; description: string } }) =>
      issueService.createIssue({ data, authToken, params: { projectId } }),
    onSuccess: () => {
      form.resetFields();
      refetch();
      onCloseDrawer();
    },
    onError: (error) => {
      console.error("ERROR :: Create Issue ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <Form
      className="bg-turnary p-3 border rounded-lg"
      form={form}
      layout="vertical"
      onFinish={(value) => {
        console.log(value);
        mutate({ data: value });
      }}
    >
      <Form.Item
        name="title"
        label={<span className="text-primary font-medium">Add a title</span>}
        rules={[{ required: true, message: "Title must be required" }]}
      >
        <Input.TextArea placeholder="Issue title" />
      </Form.Item>

      <Form.Item
        name="description"
        label={
          <span className="text-primary font-medium">Add a description</span>
        }
        rules={[{ required: true, message: "Description must be required" }]}
      >
        <ReactQuill theme="snow" />
      </Form.Item>

      <Form.Item
        name="labels"
        label={<span className="text-primary font-medium">Add a labels</span>}
      >
        <Select mode="tags" placeholder="Issue Labels" />
      </Form.Item>

      <div className="flex items-center justify-end">
        <Button
          className="ring-0 rounded-full px-6"
          htmlType="submit"
          type="primary"
          loading={isLoading}
        >
          Submit Issue
        </Button>
      </div>
    </Form>
  );
};

export default CreateIssueForm;
