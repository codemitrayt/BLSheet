import { IoIosGitMerge } from "react-icons/io";
import { Avatar, Tag } from "antd";

const TodoCard = () => {
  return (
    <div className="bg-card p-3 space-y-2 rounded-lg shadow-lg transition-transform transform border hover:bg-gray-100 cursor-pointer">
      <h3 className="flex gap-2 items-center">Hold introductory meeting</h3>

      <p className="text-gray-700 pb-2 text-sm">
        Discuss the project progress, potential challenges, and solutions.
      </p>

      <div className="flex space-x-2">
        <Tag color="green">Medium</Tag>
        <Tag color="red">In Progress</Tag>
      </div>

      <div className=" flex items-center justify-between mt-6 ">
        <span className=" flex items-center gap-2 text-muted-foreground">
          <Avatar
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            U
          </Avatar>{" "}
          <span>12-14 Jul</span>
        </span>
        <p className="mt-1 text-muted-foreground flex items-center gap-1">
          2 <IoIosGitMerge />
        </p>
      </div>
    </div>
  );
};

export default TodoCard;
