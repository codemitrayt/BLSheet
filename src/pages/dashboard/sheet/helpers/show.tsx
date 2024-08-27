import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import dateFormat from "dateformat";

import Delete from "./delete";
import Edit from "./edit";
import { BLSheet, SheetType } from "../../../../types";
import { cn, currencyFormate } from "../../../../utils";

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
    render: (description) => <p className="w-[200px]">{description}</p>,
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
    title: <span className="text-primary">Date</span>,
    dataIndex: "date",
    key: "date",
    render: (date) => <span>{dateFormat(date, "dd/mm/yyyy")}</span>,
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
    title: <span className="text-primary">Total</span>,
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (totalMoney, { type }) => (
      <span
        className={cn(
          type === SheetType.EXPENSE ? "text-red-500" : "text-green-500"
        )}
      >
        {type === SheetType.EXPENSE ? "-" : "+"}
        {currencyFormate(totalMoney)}
      </span>
    ),
  },
  {
    title: <span className="text-primary">Paid</span>,
    dataIndex: "isPaid",
    key: "isPaid",
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
      rowKey="_id"
      bordered
      pagination={{
        pageSize: 8,
      }}
      columns={[
        ...columns,
        {
          title: <span className="text-primary">Action</span>,
          key: "_id",
          render: (_, sheet) => (
            <div className="flex items-center justify-center space-x-2">
              <Edit sheet={sheet} refetchBLSheets={refetchBLSheets} />
              <Delete objectId={sheet._id!} refetchBLSheets={refetchBLSheets} />
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
