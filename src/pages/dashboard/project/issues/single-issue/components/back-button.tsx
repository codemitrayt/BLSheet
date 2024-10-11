import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const BackButton = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const handleOnClick = () => {
    const url = `/dashboard/projects/${projectId}/issues`;
    navigate(url);
  };
  return (
    <button
      onClick={handleOnClick}
      className="text-primary hover:text-primary/80"
    >
      <BsArrowLeftCircle className="size-6" />
    </button>
  );
};

export default BackButton;
