import { IoIosGitMerge } from "react-icons/io";
import { Checkbox } from "antd";
import { Avatar } from "antd";


const DashboardTodoPage = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <div className="bg-card p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-between">
                        <h3 className=" flex gap-2 items-center text-lg">
                            <Checkbox className="" value="A" /> Hold
                            introductory meeting
                        </h3>
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <span className="bg-yellow-400 text-sm text-primary-foreground px-3 py-1 rounded-lg">
                            Medium
                        </span>
                        <span className="bg-red-400 text-sm text-primary-foreground px-3 py-1 rounded-lg">
                            On Track
                        </span>
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
            </div>
        </div>
    );
};

export default DashboardTodoPage;
