import React from "react";
import { Input, Table, TableProps } from "antd";

interface DataType {
  key: React.Key;
  email: string;
}

const data: DataType[] = [
  {
    key: "1",
    email: "codemitrayt@gmail.com",
  },
  {
    key: "2",
    email: "mungse.rushi@gmail.com",
  },
  {
    key: "3",
    email: "example@example.com",
  },
  {
    key: "4",
    email: "example@example.com",
  },
  {
    key: "5",
    email: "example@example.com",
  },
  {
    key: "6",
    email: "example@example.com",
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: <span className="text-primary">Email</span>,
    dataIndex: "email",
    key: "email",
  },
  {
    title: <span className="text-primary">Actions</span>,
    dataIndex: "actions",
    key: "actions",
    render: () => {
      return <div>Actions</div>;
    },
  },
];

const TeamMembersTable = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <h1 className="text-primary text-lg font-medium">Team Members</h1>
        <Input.Search
          size="small"
          placeholder="Search user"
          className="w-[200px]"
        />
      </div>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TeamMembersTable;
