import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../services/auth-service";
import useErrorHandler from "../../hooks/useErrorHandler";

import { CreatePasswordBody } from "../../types";
import { setAuth } from "../../store/slices/auth-slice";

const CreatePasswordPage = () => {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center w-[300px] sm:w-[500px] bg-white p-6 rounded-lg">
        <Form
          className="w-full"
          layout="vertical"
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

          <Button
            className="ring-0 px-6 rounded-full w-full"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Create Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePasswordPage;
