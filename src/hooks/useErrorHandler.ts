import { message } from "antd";

const useErrorHandler = () => {
  const handleError = (error: any, msg = "Internal Server Error") => {
    const err = error ? (error?.response?.data?.errors[0]?.msg as string) : msg;
    message.open({
      content: err ? err : msg,
      type: "error",
      className: "absolute top-[40px] right-4",
      duration: 3,
    });
  };

  return { handleError };
};

export default useErrorHandler;
