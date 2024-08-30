import { useMutation } from "react-query";
import blSheetService from "../../../../services/bl-sheet-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import { TbTrash } from "react-icons/tb";
import { RiLoader4Line } from "react-icons/ri";
import ConfirmationPopUp from "../../../../components/ui/confirmation-popup";
import { Tooltip } from "antd";

interface DeleteProps {
  objectId: string;
  refetchBLSheets: () => void;
}

const Delete = ({ objectId, refetchBLSheets }: DeleteProps) => {
  const { authToken } = useUserInfo();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: ({ data }: { data: { objectId: string } }) =>
      blSheetService().deleteBLSheet({ data, authToken }),
    onSuccess: () => {
      refetchBLSheets();
    },
    onError: (error) => {
      console.error("ERROR :: delete bl sheet ::", error);
    },
    retry: false,
  });

  const handleDelete = () => {
    mutate({ data: { objectId } });
  };

  return (
    <ConfirmationPopUp
      title="Delete BL Sheet"
      description="Are you sure to delete this sheet?"
      fn={handleDelete}
      icon={
        <div className="flex items-center justify-center h-5 mr-2">
          <TbTrash className="text-red-500" />
        </div>
      }
      isLoading={isLoading}
    >
      <Tooltip title="Delete sheet">
        <button className="text-red-500 hover:text-red-500/80 transition">
          {isLoading ? <RiLoader4Line className="animate-spin" /> : <TbTrash />}
        </button>
      </Tooltip>
    </ConfirmationPopUp>
  );
};

export default Delete;
