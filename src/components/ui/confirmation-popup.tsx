import { Popconfirm } from "antd";
import useAuth from "../../hooks/useAuth";
import { UserRole } from "../../types";
import useErrorHandler from "../../hooks/useErrorHandler";

interface ConfirmationPopUpProps {
  children: React.ReactNode;
  fn: () => void;
  title: string;
  isLoading: boolean;
  description: string;
  icon?: React.ReactNode;
}

const ConfirmationPopUp = ({
  children,
  fn,
  title,
  isLoading,
  description,
  icon,
}: ConfirmationPopUpProps) => {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();

  const handleOnDelete = () => {
    if (user?.role === UserRole.GUEST) {
      handleError(
        null,
        "This is a Guest Account - You Do Not Have Access to Delete"
      );
      return;
    }
    fn();
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      icon={icon}
      okButtonProps={{ loading: isLoading, style: { boxShadow: "none" } }}
      onConfirm={handleOnDelete}
    >
      {children}
    </Popconfirm>
  );
};

export default ConfirmationPopUp;
