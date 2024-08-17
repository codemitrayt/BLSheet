import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const AuthLinks = () => {
  const navigate = useNavigate();
  const handleClickSignIn = () => navigate("/auth/sign-in");
  const handleClickSignUp = () => navigate("/auth/sign-up");

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button onClick={handleClickSignIn}>Sign In</Button>
      <Button onClick={handleClickSignUp} type="primary">
        Sign Up
      </Button>
    </div>
  );
};

export default AuthLinks;
