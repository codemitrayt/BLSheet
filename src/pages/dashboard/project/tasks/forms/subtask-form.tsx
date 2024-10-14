import { Button, Form, Input } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { CgAdd } from "react-icons/cg";

import DottedSeparator from "../../../../../components/ui/dotted-separator";

const SubtaskForm = () => {
  return (
    <div className="py-2 space-y-2">
      <DottedSeparator color="#000" />
      <h1 className="text-primary font-medium pl-1">Subtasks</h1>
      <Form.List name="subtasks">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div className="flex items-center space-x-2 w-full" key={key}>
                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  className="w-full p-0 m-0"
                >
                  <Input placeholder="Subtasks title" />
                </Form.Item>

                {/* <Form.Item
                  {...restField}
                  name={[name, "weightage"]}
                  className="w-[250px]"
                >
                  <InputNumber placeholder="Weightage" />
                </Form.Item> */}

                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}

            <div className="flex items-center justify-end">
              <Button
                icon={<CgAdd />}
                htmlType="button"
                className="text-xs ring-0 px-3 rounded-full"
                onClick={() => add()}
                size="small"
              >
                Add
              </Button>
            </div>
          </>
        )}
      </Form.List>

      <DottedSeparator color="#000" />
    </div>
  );
};

export default SubtaskForm;
