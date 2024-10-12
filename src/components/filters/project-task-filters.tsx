import { Button, Checkbox, Dropdown, Input, Menu, Select } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

import { useDebounce } from "../../hooks/useDebounce";
import { TASK_PRIORITY } from "../../constants";
import useProjectTaskFilters from "../../hooks/useProjectTaskFilters";

enum TaskPriority {
  ALL = "all",
  Low = "low",
  Medium = "medium",
  High = "high",
}

const ProjectTaskFilters = () => {
  const {
    search,
    priority,
    setFilters,
    assignedToMe,
    sortByCreatedAt,
    createdByMe,
  } = useProjectTaskFilters();
  const [localSearch, setLocalSearch] = useState<string | undefined>(search);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    setFilters({
      search: debouncedSearch,
      priority,
      sortByCreatedAt: sortByCreatedAt === "true" ? true : false,
      assignedToMe: assignedToMe === "true" ? true : false,
      createdByMe: createdByMe === "true" ? true : false,
    });
  }, [debouncedSearch]);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox
          name="assignedToMe"
          checked={assignedToMe === "true" ? true : false}
          onChange={(value) =>
            setFilters({
              assignedToMe: value.target.checked,
              sortByCreatedAt: sortByCreatedAt === "true" ? true : false,
              createdByMe: createdByMe === "true" ? true : false,
              search,
              priority,
            })
          }
        >
          Assigned to Me
        </Checkbox>
      </Menu.Item>

      <Menu.Item key="2">
        <Checkbox
          name="sortByCreatedAt"
          checked={sortByCreatedAt === "true" ? true : false}
          onChange={(value) =>
            setFilters({
              sortByCreatedAt: value.target.checked,
              assignedToMe: assignedToMe === "true" ? true : false,
              createdByMe: createdByMe === "true" ? true : false,
              search,
              priority,
            })
          }
        >
          Sort by Created At
        </Checkbox>
      </Menu.Item>

      <Menu.Item key="3">
        <Checkbox
          name="createdByMe"
          checked={createdByMe === "true" ? true : false}
          onChange={(value) =>
            setFilters({
              createdByMe: value.target.checked,
              sortByCreatedAt: sortByCreatedAt === "true" ? true : false,
              assignedToMe: assignedToMe === "true" ? true : false,
              search,
              priority,
            })
          }
        >
          Created By Me
        </Checkbox>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center space-x-2">
      <Input.Search
        allowClear
        value={localSearch}
        placeholder="Search all tasks"
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-[300px]"
      />

      <Select
        className="w-[120px]"
        defaultValue={priority as TaskPriority}
        options={[{ label: "All", value: "all" }, ...TASK_PRIORITY]}
        placeholder="Priority"
        onChange={(value: TaskPriority) =>
          setFilters({ priority: value, search })
        }
      />
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button className="text-gray-500">
          Filter <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ProjectTaskFilters;
