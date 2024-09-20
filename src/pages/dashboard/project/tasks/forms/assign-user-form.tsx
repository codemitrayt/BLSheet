import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { Select, Spin } from "antd";
import { BiSearch } from "react-icons/bi";

import queryKeys from "../../../../../constants/query-keys";
import { AssignUser, ProjectMember, ProjectTask } from "../../../../../types";

import { useDebounce } from "../../../../../hooks/useDebounce";
import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectService from "../../../../../services/project-service";
import MemberCard from "../cards/member-card";
import projectTaskService from "../../../../../services/project-task-service";

interface AssignUserForm {
  projectTask: ProjectTask;
  refetchProjectTasks: () => void;
}

export interface AssignUserToProjectTask {
  memberEmailId: string;
  projectId: string;
  projectTaskId: string;
}

const AssignUserForm = ({
  projectTask,
  refetchProjectTasks,
}: AssignUserForm) => {
  const { projectId } = useParams();
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [values, setValues] = useState<AssignUser[]>([]);
  const [options, setOptions] = useState([]);
  const [localSearch, setLocalSearch] = useState<string>();
  const debounceSearch = useDebounce(localSearch);

  const handleAddUser = (info: { label: string; value: string }) => {
    const existingUser = values.find(
      (user) => user.memberEmailId === info.label
    );

    if (existingUser) {
      handleError(null, "Already assigned this user.");
      return;
    }

    setValues((prev) => [
      ...prev,
      { _id: info.value, memberEmailId: info.label },
    ]);

    assignUser({
      data: {
        projectId: projectId as string,
        memberEmailId: info.label,
        projectTaskId: projectTask._id,
      },
    });
  };

  useEffect(() => {
    mutate({
      params: { memberEmail: debounceSearch || "", status: "accepted" },
    });
  }, [debounceSearch]);

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.projectMember.getProjectMembers],
    mutationFn: ({
      params,
    }: {
      params: { memberEmail: string; status: string };
    }) =>
      projectService().getProjectMembers({
        data: { objectId: projectId },
        authToken,
        params,
      }),
    onSuccess: ({ data }) => {
      const members = data?.message?.projectMembers || [];
      const allMembers = members.map((member: ProjectMember) => {
        return {
          label: member.memberEmailId,
          value: member._id,
        };
      });
      setOptions(allMembers);
    },
    onError: (error) => {
      console.error("ERROR :: project members ::", error);
      handleError(error);
    },
    retry: false,
  });

  const { mutate: assignUser } = useMutation({
    mutationKey: [queryKeys.projectTask.assignUserToProjectTask],
    mutationFn: ({ data }: { data: AssignUserToProjectTask }) =>
      projectTaskService().assignUserToProjectTask({ data, authToken }),
    onSuccess: () => {
      refetchProjectTasks();
    },
    onError: (error) => {
      console.error("ERROR :: assign user to project task ::", error);
      handleError(error);
    },
    retry: false,
  });

  useEffect(() => {
    setValues(projectTask.assignedMembers || []);
  }, []);

  return (
    <div className="p-6 rounded-lg bg-turnary border">
      <div className="text-primary font-medium pl-1 pb-1">
        Assign user to Project Task
      </div>

      <Select
        showSearch
        allowClear
        value={values}
        options={options}
        onSearch={(value) => setLocalSearch(value)}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        onSelect={(_, info) => handleAddUser(info)}
        filterOption={false}
        suffixIcon={<BiSearch />}
        placeholder="Search by member email"
        className="w-full"
      />

      <div className="mt-3 space-y-2">
        {values.map((value) => (
          <MemberCard key={value._id} member={value} />
        ))}
      </div>
    </div>
  );
};

export default AssignUserForm;
