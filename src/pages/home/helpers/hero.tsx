import { Link } from "react-router-dom";

import { LuListTodo } from "react-icons/lu";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import { GoProject } from "react-icons/go";

const Hero = () => {
  const { isAuth } = useAuth();
  const getStartedUrl = isAuth ? "/dashboard/home" : "/auth/login";

  return (
    <div className="w-[90%] mx-auto relative bg-grid-gray-300/[0.2] sm:bg-grid-gray-600/[0] z-[10] bg-white py-4 sm:py-10">
      <div className="flex items-center justify-center flex-col sm:block px-2 sm:container">
        <p className="text-md">
          Welcome to <span className="text-primary">BL Sheet</span>{" "}
        </p>

        <h1 className="text-center sm:text-start text-xl sm:text-2xl md:text-4xl xl:text-5xl font-bold mt-8 text-primary">
          Boost Your Productivity with BL Sheet
        </h1>

        <p className="text-sm mt-2 text-gray-600 text-center sm:text-start">
          Welcome to Your All-in-One Project Management, Financial Management
          and Productivity Tool
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-4">
          <div className="flex items-center space-x-2 text-primary text-sm">
            <GoProject />
            <span>Project Management</span>
          </div>

          <div className="border-l border-black h-[10px] hidden sm:block" />

          <div className="flex items-center space-x-2 text-primary text-sm">
            <LuListTodo />
            <span>Productivity Tools</span>
          </div>

          <div className="border-l border-black h-[10px] hidden sm:block" />

          <div className="flex items-center space-x-2 text-primary text-sm">
            <RiMoneyRupeeCircleLine />
            <span>Personal Finance Manager</span>
          </div>
        </div>

        <Link
          to={getStartedUrl}
          className="mt-4 inline-flex text-white animate-shimmer items-center justify-center rounded-full border  bg-[linear-gradient(110deg,#2F667F,45%,#9ca3af,55%,#2F667F)] bg-[length:200%_100%] px-5 py-2 text-sm font-light transition-colors focus:outline-none"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
