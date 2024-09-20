import { message } from "antd";

const useErrorHandler = () => {
  const handleError = (error: any, msg = "Internal Server Error") =>
    message.open({
      content: error ? (error?.response?.data?.errors[0].msg as string) : msg,
      type: "error",
      className: "absolute top-[2px] right-[10px]",
      duration: 3,
    });

  return { handleError };
};

export default useErrorHandler;
