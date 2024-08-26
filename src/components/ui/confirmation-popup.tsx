import { Popconfirm } from "antd";

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
  return (
    <Popconfirm
      title={title}
      description={description}
      icon={icon}
      okButtonProps={{ loading: isLoading, style: { boxShadow: "none" } }}
      onConfirm={fn}
    >
      {children}
    </Popconfirm>
  );
};

export default ConfirmationPopUp;
