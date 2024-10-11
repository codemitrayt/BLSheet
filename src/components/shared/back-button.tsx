import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils";

interface BackButton {
  redirectUrl: string;
  iconClassName?: string;
}

const BackButton = ({ redirectUrl, iconClassName }: BackButton) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(redirectUrl)}
      className="text-primary hover:text-primary/80"
    >
      <BsArrowLeftCircle className={cn("size-6", iconClassName)} />
    </button>
  );
};

export default BackButton;
