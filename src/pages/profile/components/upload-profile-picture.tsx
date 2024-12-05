import { useMutation } from "react-query";
import { message, Upload } from "antd";
import { useDispatch } from "react-redux";
import ImgCrop from "antd-img-crop";

import useAuth from "../../../hooks/useAuth";
import queryKeys from "../../../constants/query-keys";
import authService from "../../../services/auth-service";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { setUser } from "../../../store/slices/auth-slice";
import { UserRole } from "../../../types";

const FILE_SIZE = 1048576;

const UploadProfilePicture = () => {
  const dispatch = useDispatch();
  const { authToken, user } = useAuth();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.auth.uploadProfilePicture],
    mutationFn: ({ data }: { data: any }) =>
      authService().uploadProfilePicture({ data, authToken }),
    onSuccess: ({ data }) => {
      dispatch(setUser({ ...user, avatar: data?.message?.avatar }));
      message.open({
        content: "Profile picture uploaded successfully",
        type: "success",
        className: "absolute top-[40px] right-4",
      });
    },
    onError: (error) => {
      console.error("ERROR :: upload profile picture ::", error);
      handleError(error);
    },
    retry: false,
  });

  const onChange = (data: any) => {
    if (data?.file) {
      console.log(data?.file?.size, FILE_SIZE);
      if (data?.file.size > FILE_SIZE) {
        message.open({
          content: "File size exceeds 1MB",
          type: "error",
          className: "absolute top-[40px] right-4",
        });
        return;
      }
      const formData = new FormData();
      formData.append("avatar", data.file);
      mutate({ data: formData });
    } else {
      message.open({
        content: "No file selected",
        type: "error",
        className: "absolute top-[40px] right-4",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="border border-primary px-6 py-1 rounded-full bg-primary text-white">
        Uploading...
      </div>
    );
  }

  if (user?.role === UserRole.GUEST) return null;

  return (
    <ImgCrop rotationSlider>
      <Upload
        fileList={[]}
        maxCount={1}
        beforeUpload={() => false}
        onChange={onChange}
      >
        <button className="border border-primary px-6 py-1 rounded-full bg-primary text-white">
          {user?.avatar ? "Edit" : "Upload"}
        </button>
      </Upload>
    </ImgCrop>
  );
};

export default UploadProfilePicture;
