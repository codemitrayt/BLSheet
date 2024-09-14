import { Avatar } from "antd";
import useUserInfo from "../../hooks/useUserInfo";

const ProfilePage = () => {
  const { user } = useUserInfo();
  return (
    <div className="mx-auto container w-[90%]">
      <div className="p-8 border rounded-lg shadow-sm w-full mt-6 bg-turnary">
        <div className="flex items-center space-x-10">
          <div>
            <Avatar size={200} className="bg-primary">
              {user?.fullName[0].toUpperCase()}
            </Avatar>
          </div>
          <div className="flex flex-col space-y-6">
            <h1 className="text-primary font-medium text-3xl">
              {user?.fullName}
            </h1>
            <div className="flex items-center space-x-8">
              <div className="flex flex-col">
                <h1 className="text-primary font-medium text-sm">Role</h1>
                <h1 className="text-gray-800 text-sm">{user?.role}</h1>
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
