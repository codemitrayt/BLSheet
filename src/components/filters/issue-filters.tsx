import { Button, Checkbox, Dropdown, Input, Menu } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

import { useDebounce } from "../../hooks/useDebounce";
import useIssueFilters from "../../hooks/useIssueFilters";

const IssueFilters = ({ onlySearch = false }: { onlySearch?: boolean }) => {
  const {
    search,
    priority,
    setFilters,
    assignedToMe,
    sortByCreatedAt,
    createdByMe,
    status,
  } = useIssueFilters();
  const [localSearch, setLocalSearch] = useState<string | undefined>(search);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    setFilters({
      search: debouncedSearch,
      priority,
      sortByCreatedAt: sortByCreatedAt === "true" ? true : false,
      assignedToMe: assignedToMe === "true" ? true : false,
      createdByMe: createdByMe === "true" ? true : false,
      status,
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
              status,
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
              status,
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
              status,
            })
          }
        >
          Created By Me
        </Checkbox>
      </Menu.Item>
    </Menu>
  );

  if (onlySearch) {
    return (
      <Input.Search
        allowClear
        value={localSearch}
        placeholder="Search all issues"
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full"
      />
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          Filter <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default IssueFilters;
