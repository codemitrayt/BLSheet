import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";

import siteConfig from "../../configs/site-config";
import Logo from "../../components/ui/logo";
import authService from "../../services/auth-service";
import useErrorHandler from "../../hooks/useErrorHandler";
import { SendVerificationEmailForRegistrationBody } from "../../types";

const SignUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["send-verification-email-for-registration"],
    mutationFn: ({
      data,
    }: {
      data: SendVerificationEmailForRegistrationBody;
    }) => authService().sendVerificationEmailForRegistration({ data }),
    onSuccess: () => {
      const url = `/auth/email-verification?email=${form.getFieldValue(
        "email"
      )}`;
      navigate(url);
    },
    onError: (error) => {
      console.log(
        "ERROR :: send verification email for registration ::",
        error
      );
      handleError(error);
    },
    retry: false,
  });

  const handleOnSubmit = (data: SendVerificationEmailForRegistrationBody) => {
    mutate({ data });
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
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center justify-center space-x-3">
            <Logo />
            <span className="text-4xl font-bold text-primary">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-sm text-primary">Welcome, create your account</p>
        </div>

        <Form
          layout="vertical"
          form={form}
          className="w-[300px] mt-6"
          onFinish={(values: SendVerificationEmailForRegistrationBody) =>
            handleOnSubmit(values)
          }
        >
          <Form.Item
            name="fullName"
            className="w-full"
            label={<span className="text-primary font-medium">Full Name</span>}
            rules={[
              { required: true, message: "Full name should be required" },
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

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
              Sign Up
            </Button>
          </div>
        </Form>

        <p className="text-sm mt-4 text-center">
          Already have an account?
          <Link
            to="/auth/sign-in"
            className="text-secondary hover:text-primary hover:underline pl-2 "
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
