import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../services/auth-service";
import useErrorHandler from "../../hooks/useErrorHandler";

import { CreatePasswordBody } from "../../types";
import { setAuth } from "../../store/slices/auth-slice";

const CreatePasswordPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();
  const [search] = useSearchParams();
  const token = search.get("token");

  const { mutate, isLoading } = useMutation({
    mutationKey: ["create-password"],
    mutationFn: ({ data }: { data: CreatePasswordBody }) =>
      authService().createPassword({ data }),
    onSuccess: ({ data }) => {
      dispatch(
        setAuth({
          user: data?.message.user,
          authToken: data.message?.authToken,
        })
      );
    },
    onError: (error) => {
      console.log("ERROR: create password ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleSubmit = (values: CreatePasswordBody) => {
    mutate({ data: { ...values, token: token as string } });
  };

  return (
    <div className="flex items-center justify-center lg:justify-end relative min-h-screen">
      <div className="hidden lg:block">
        <div className="w-[843px] h-[843px] rounded-full bg-secondary absolute z-10 -top-[206px] -left-[342px]" />
        <div className="absolute left-[5%] top-[15%] z-10">
          <h1 className="text-[40px] w-[325px] font-light text-white">
            Manage Your <br /> Income <br />
            Expence <br /> Investment
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center md:w-[50%] flex-col bg-white p-6 lg:bg-transparent rounded-lg">
        <div className="flex items-center justify-center flex-col space-y-2">
          <h1 className="text-2xl font-medium text-primary">Create Password</h1>
        </div>

        <Form
          layout="vertical"
          form={form}
          className="w-[300px] mt-6"
          onFinish={(value: CreatePasswordBody) => handleSubmit(value)}
        >
          <Form.Item
            name="password"
            label={<span className="text-primary font-medium">Password</span>}
            rules={[
              { required: true, message: "Password should be required" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password placeholder="Enter plassword" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={
              <span className="text-primary font-medium">Confirm Password</span>
            }
            rules={[
              { required: true, message: "Password should be required" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password placeholder="Enter plassword" />
          </Form.Item>

          <div className="flex items-center justify-center w-full">
            <Button
              type="primary"
              className="w-full px-6 ring-0 rounded-full"
              htmlType="submit"
              loading={isLoading}
            >
              Create Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePasswordPage;
