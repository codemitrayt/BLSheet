import { useEffect } from "react";
import { Avatar } from "antd";
import useAuth from "../../hooks/useAuth";
import UploadProfilePicture from "./components/upload-profile-picture";
import { capitalizeFirstLetter } from "../../utils";
import UpdateFullName from "./components/update-fullname";

const ProfilePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Profile - BL Sheet";
  }, []);

  return (
    <div className="relative">
      <div className="p-3 md:p-8 border rounded-lg shadow-sm w-full mt-6 bg-turnary">
        <div className="flex items-center flex-col md:flex-row space-x-3 md:space-x-10">
          <div className="relative">
            <Avatar src={user?.avatar?.url} className="bg-primary size-[200px]">
              <span className="text-[20px] md:text-[40px]">
                {user?.fullName[0].toUpperCase()}
              </span>
            </Avatar>
            <div className="absolute bottom-0 left-0">
              <UploadProfilePicture />
            </div>
          </div>

          <div className="flex flex-col space-y-6 mt-4 md:mt-0">
            <div className="space-x-2 flex items-center">
              <h1 className="text-primary font-medium sm:text-xl md:text-3xl">
                {user?.fullName}
              </h1>
              <UpdateFullName />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex flex-col">
                <h1 className="text-primary font-medium text-sm">Role</h1>
                <h1 className="text-gray-800 text-sm">
                  {capitalizeFirstLetter(user?.role)}
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-primary font-medium text-sm">
                  Email Adress
                </h1>
                <h1 className="text-gray-800 text-sm">{user?.email}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
