import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  clientName: string;
  description: string;
  money: number;
  isPaid: boolean;
  tax: number;
  date: Date;
}

const data: DataType[] = [
  {
    key: "1",
    clientName: "John Brown",
    description: "some description",
    money: 100,
    isPaid: true,
    tax: 10,
    date: new Date(),
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: <span className="text-primary">Client Name</span>,
    dataIndex: "clientName",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: <span className="text-primary">Description</span>,
    dataIndex: "description",
    key: "description",
  },
  {
    title: <span className="text-primary">Money</span>,
    dataIndex: "money",
    key: "money",
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
    render: (date) => <span>{date.getMonth()}</span>,
  },
  {
    title: <span className="text-primary">Paid</span>,
    dataIndex: "paid",
    key: "paid",
    render: (isPaid) => <span>{isPaid ? "Yes" : "No"}</span>,
  },
  {
    title: <span className="text-primary">Action</span>,
    key: "action",
    render: () => <h1>Actios</h1>,
  },
];

const Show = () => {
  return <Table bordered columns={columns} dataSource={data} />;
};

export default Show;
