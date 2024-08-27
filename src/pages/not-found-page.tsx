import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/")}
            className="px-6 rounded-full ring-0"
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
