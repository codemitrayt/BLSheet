import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect } from "react";

import { URLS } from "../../constants";
import authService from "../../services/auth-service";
import useErrorHandler from "../../hooks/useErrorHandler";

interface EmailBody {
  email: string;
}

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    document.title = "BL Sheet Forgot Password";
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: ({ data }: { data: EmailBody }) =>
      authService().forgotPassword({ data }),
    onSuccess: () => {
      const url = `/auth/email-verification?email=${form.getFieldValue(
        "email"
      )}`;
      navigate(url);
    },
    onError: (error) => {
      console.error("ERROR :: forgot password ::", error);
      handleError(error);
    },
    retry: false,
  });

  const backToSignIn = () => navigate(URLS.signInPageUrl);

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
          <h1 className="text-2xl font-medium text-primary">
            Forgot password?
          </h1>
          <p className="text-sm">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <Form
          layout="vertical"
          form={form}
          className="w-[300px] mt-6"
          onFinish={(values: { email: string }) => mutate({ data: values })}
        >
          <Form.Item
            name="email"
            className="w-full"
            label={<span className="text-primary font-medium">Email</span>}
            rules={[
              {
                type: "email",
                message: "Email should be a valid email address",
              },
              { required: true, message: "Email should be required" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <div className="flex items-center justify-center w-full">
            <Button
              type="primary"
              className="w-full px-6 ring-0 rounded-full"
              htmlType="submit"
              loading={isLoading}
            >
              Reset Password
            </Button>
          </div>
        </Form>

        <button
          onClick={backToSignIn}
          className="flex items-center justify-center space-x-1 text-sm mt-4 text-center text-secondary hover:text-secondary/80 hover:underline transition-all"
        >
          <MdKeyboardBackspace />
          <span>Back to sign in</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
