import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import { CreateSheetTabProps, SheetType } from "../../../../../types";

interface FormSchema {
  clientName: string;
  description: string;
  money: number;
  isPaid: boolean;
  tax: number;
  date: Date;
}

const IncomeTab = ({ createBlSheet, isLoading }: CreateSheetTabProps) => {
  const [form] = Form.useForm();

  return (
    <div className="bg-turnary p-6 rounded-lg">
      <Form
        form={form}
        initialValues={{ isPaid: false, tax: 0 }}
        layout="vertical"
        onFinish={(values: FormSchema) => {
          createBlSheet({
            data: {
              ...values,
              date: values.date.toISOString(),
              type: SheetType.INCOME,
            },
          });
        }}
      >
        <Form.Item
          name="clientName"
          label={<span className="text-primary font-medium">Client Name</span>}
          rules={[{ required: true, message: "Client Name must be required" }]}
        >
          <Input placeholder="Client Name" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-primary font-medium">Income Description</span>
          }
          rules={[{ required: true, message: "Description must be required" }]}
        >
          <Input.TextArea placeholder="Income Description" />
        </Form.Item>

        <div className="flex items-center space-x-8">
          <Form.Item
            name="money"
            label={<span className="text-primary font-medium">Income</span>}
            rules={[{ required: true, message: "Income must be required" }]}
          >
            <InputNumber
              min={1}
              className="w-full"
              placeholder="Ex.40"
              suffix="₹"
            />
          </Form.Item>

          <Form.Item
            name="tax"
            label={<span className="text-primary font-medium">Tax</span>}
            rules={[{ required: true, message: "Tax must be required" }]}
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Ex.40"
              suffix="%"
            />
          </Form.Item>
        </div>

        <div className="flex items-center space-x-16">
          <Form.Item
            name="date"
            label={<span className="text-primary font-medium">Date</span>}
            rules={[{ required: true, message: "Date must be required" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item name="isPaid" className="mb-12">
            <span className="text-primary font-medium pr-5">Paid</span>
            <Checkbox />
          </Form.Item>
        </div>
        <div className="flex items-center justify-end">
          <Button
            htmlType="submit"
            className="px-6 rounded-full ring-0"
            type="primary"
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default IncomeTab;
