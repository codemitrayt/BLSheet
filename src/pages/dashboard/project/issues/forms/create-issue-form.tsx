import { Button, Form, Input, Select, SelectProps, Tag } from "antd";
import { useMutation, useQuery } from "react-query";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useState } from "react";

import queryKeys from "../../../../../constants/query-keys";
import issueService from "../../../../../services/issue-service";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectService from "../../../../../services/project-service";
import { Label } from "../../../../../types";

interface CreateIssueForm {
  refetch: () => void;
  onCloseDrawer: () => void;
}

type TagRender = SelectProps["tagRender"];

const CreateIssueForm = ({ onCloseDrawer, refetch }: CreateIssueForm) => {
  const [form] = Form.useForm();
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const [labels, setLabels] = useState([]);

  const { isLoading: loadingGetLabels } = useQuery({
    queryKey: [queryKeys.project.getProjectLables],
    queryFn: () =>
      projectService().getProjectLabels({
        authToken,
        params: { objectId: projectId as string },
      }),
    onSuccess: ({ data }) => {
      const labels = (data?.message?.labels || []).map((label: Label) => ({
        ...label,
        value: label.name,
        label: label.name,
        title: label.color,
      }));
      setLabels(labels);
    },
    onError: (error) => {
      console.log("ERROR :: GETTING LABLES", error), handleError(error);
    },
    retry: false,
  });

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

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const find = labels.find(
      (label: Label) => label.name === value
    ) as unknown as Label;
    return (
      <Tag
        color={find?.color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form
      className="bg-turnary p-3 border rounded-lg"
      form={form}
      layout="vertical"
      onFinish={(value) => {
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
        <Select
          tagRender={tagRender}
          loading={loadingGetLabels}
          mode="tags"
          options={labels}
          placeholder="Issue Labels"
        />
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
