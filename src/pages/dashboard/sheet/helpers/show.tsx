import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import dateFormat from "dateformat";

import { BLSheet, SheetType } from "../../../../types";
import { currencyFormate } from "../../../../utils";
import Delete from "./delete";

const columns: TableProps<BLSheet>["columns"] = [
  {
    title: <span className="text-primary">Client Name</span>,
    dataIndex: "clientName",
    key: "name",
  },
  {
    title: <span className="text-primary">Description</span>,
    dataIndex: "description",
    key: "description",
  },
  {
    title: <span className="text-primary">Sheet Type</span>,
    dataIndex: "type",
    key: "type",
    render: (type) => (
      <Tag
        className="rounded-full w-[90px] flex items-center justify-center"
        color={
          type === SheetType.INCOME
            ? "green"
            : type === SheetType.EXPENSE
            ? "red"
            : "orange"
        }
      >
        {type}
      </Tag>
    ),
  },
  {
    title: <span className="text-primary">Money</span>,
    dataIndex: "money",
    key: "money",
    render: (money) => <span>{currencyFormate(money)}</span>,
  },
  {
    title: <span className="text-primary">Tax</span>,
    dataIndex: "tax",
    key: "tax",
    render: (tax) => <span>{tax}%</span>,
  },
  {
    title: <span className="text-primary">Date</span>,
    dataIndex: "date",
    key: "date",
    render: (date) => <span>{dateFormat(date, "dd/mm/yyyy")}</span>,
  },
  {
    title: <span className="text-primary">Paid</span>,
    dataIndex: "isPaid",
    key: "paid",
    render: (isPaid) => (
      <Tag
        color={isPaid ? "green" : "red"}
        className="flex items-center justify-center w-[40px] rounded-full"
      >
        {isPaid ? "Yes" : "No"}
      </Tag>
    ),
  },
];

interface ShowProps {
  isLoading: boolean;
  data: BLSheet[];
  refetchBLSheets: () => void;
}

const Show = ({ isLoading, data, refetchBLSheets }: ShowProps) => {
  return (
    <Table
      bordered
      columns={[
        ...columns,
        {
          title: <span className="text-primary">Action</span>,
          key: "action",
          render: (_, { _id }) => (
            <div className="flex items-center space-x-2">
              <Delete objectId={_id!} refetchBLSheets={refetchBLSheets} />
            </div>
          ),
        },
      ]}
      dataSource={data}
      loading={isLoading}
    />
  );
};

export default Show;
