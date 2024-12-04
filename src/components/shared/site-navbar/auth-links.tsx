import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import ProductHunt from "../product-hunt";

const AuthLinks = () => {
  const navigate = useNavigate();
  const handleClickSignIn = () => navigate("/auth/sign-in");
  const handleClickSignUp = () => navigate("/auth/sign-up");

  return (
    <div className="flex items-center justify-center space-x-2">
      <ProductHunt />
      <Button onClick={handleClickSignIn}>Sign In</Button>
      <Button onClick={handleClickSignUp} type="primary" className="ring-0">
        Sign Up
      </Button>
    </div>
  );
};

export default AuthLinks;
