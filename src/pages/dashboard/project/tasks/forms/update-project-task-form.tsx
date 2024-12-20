import { Button, DatePicker, Form, Input, Select } from "antd";
import { useMutation } from "react-query";
import { useEffect } from "react";
import dateformat from "dateformat";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectTaskService from "../../../../../services/project-task-service";

import { ProjectTask, UserRole } from "../../../../../types";
import { TASK_PRIORITY, TASK_STATUS } from "../../../../../constants";
import SubtaskForm from "./subtask-form";
import TASK_TYPE from "../../../../../constants/task-type";

dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

interface UpdateProjectTaskFormProps {
  onCloseDrawer: () => void;
  refetchProjectTaskList: () => void;
  projectTask: ProjectTask;
}

const UpdateProjectTaskForm = ({
  refetchProjectTaskList,
  onCloseDrawer,
  projectTask,
}: UpdateProjectTaskFormProps) => {
  const { authToken, user } = useAuth();
  const [form] = Form.useForm();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["update-project-task"],
    mutationFn: ({ data }: { data: ProjectTask }) =>
      projectTaskService().updateProjectTask({
        data,
        authToken,
        params: { objectId: projectTask._id },
      }),
    onSuccess: () => {
      refetchProjectTaskList();
      onCloseDrawer();
    },
    onError: (error) => {
      console.error("ERROR :: update Project Task ::", error);
      handleError(error);
    },
    retry: false,
  });

  useEffect(() => {
    form.setFieldsValue({ ...projectTask });
  }, [projectTask]);

  return (
    <div className="bg-turnary p-6 rounded-lg">
      <Form
        layout="vertical"
        form={form}
        initialValues={{ priority: "low", status: "todo" }}
        onFinish={(data) => {
          if (user?.role === UserRole.GUEST) {
            handleError(
              null,
              "This is a Guest Account - You Do Not Have Access to Update"
            );
            return;
          }

          const values = {
            ...projectTask,
            ...data,
            ...(data.date?.length && {
              startDate: data.date[0].toISOString(),
              endDate: data.date[1].toISOString(),
            }),
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
            placeholder="Title"
            showCount
            count={{ max: 100 }}
            rows={2}
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
          <Input.TextArea
            rows={3}
            placeholder="Description"
            showCount
            count={{ max: 250 }}
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
          >
            <DatePicker.RangePicker
              defaultValue={[
                dayjs(
                  dateformat(projectTask.startDate, "dd/mm/yyyy"),
                  dateFormat
                ),
                dayjs(
                  dateformat(projectTask.endDate, "dd/mm/yyyy"),
                  dateFormat
                ),
              ]}
              format={dateFormat}
              placeholder={["Start date", "End date"]}
              className="w-full"
            />
          </Form.Item>
        </div>
        <Form.Item
          className="w-full"
          name="taskType"
          label={<span className="text-primary font-medium">Task Type</span>}
          rules={[{ required: true, message: "Task type is required" }]}
        >
          <Select
            className="w-full"
            placeholder="Tags"
            suffixIcon={null}
            maxCount={3}
            options={TASK_TYPE}
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
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateProjectTaskForm;
