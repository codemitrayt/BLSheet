import { useState } from "react";
import { useMutation } from "react-query";
import { Button, Input, message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";

import useAuth from "../../../hooks/useAuth";
import queryKeys from "../../../constants/query-keys";
import authService from "../../../services/auth-service";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { setUser } from "../../../store/slices/auth-slice";

const UpdateFullName = () => {
  const dispatch = useDispatch();
  const { authToken, user } = useAuth();
  const { handleError } = useErrorHandler();
  const [fullName, setFullName] = useState(user?.fullName);
  const [modalState, setModalState] = useState(false);

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.auth.uploadProfilePicture],
    mutationFn: ({ data }: { data: any }) =>
      authService().updateFullName({ data, authToken }),
    onSuccess: ({ data }) => {
      dispatch(setUser({ ...user, fullName: data?.message?.fullName }));
      message.open({
        content: "User fullname updated successfully",
        type: "success",
        className: "absolute top-[55px] right-4",
      });
      setModalState(false);
    },
    onError: (error) => {
      console.error("ERROR :: update fullname ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <>
      <button
        onClick={() => setModalState(true)}
        className="text-green-500 hover:text-green-500/80"
      >
        <BiEdit />
      </button>

      <Modal
        open={modalState}
        onCancel={() => setModalState(false)}
        title={<span className="text-primary">Update Full Name</span>}
        footer={null}
      >
        <div className="space-y-1">
          <h1 className="font-medium pl-1">Full Name</h1>
          <Input
            placeholder="Enter your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button
            loading={isLoading}
            disabled={!fullName?.trim()}
            onClick={() => mutate({ data: { fullName } })}
            type="primary"
            className="px-6 ring-0 rounded-full"
          >
            Save Changes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateFullName;
