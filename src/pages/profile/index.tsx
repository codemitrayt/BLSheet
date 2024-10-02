import { Avatar } from "antd";
import useAuth from "../../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="mx-auto container w-[90%]">
      <div className="p-3 md:p-8 border rounded-lg shadow-sm w-full mt-6 bg-turnary">
        <div className="flex items-center space-x-3 md:space-x-10">
          <div>
            <Avatar className="bg-primary size-[50px] sm:size-[100px]  md:size-[200px]">
              <span className="text-[20px] md:text-[40px]">
                {user?.fullName[0].toUpperCase()}
              </span>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-6">
            <h1 className="text-primary font-medium text-xl md:text-3xl">
              {user?.fullName}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
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
