import { Link } from "react-router-dom";
import { GoProject } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

import useAuth from "../../../hooks/useAuth";
import GridEffect from "../../../components/effects/grid-effect";
import ProductHunt from "../../../components/shared/product-hunt";

const Hero = () => {
  const { isAuth } = useAuth();
  const getStartedUrl = isAuth ? "/dashboard/projects" : "/auth/sign-up";

  return (
    <div className="relative">
      <GridEffect />
      <div className="w-[90%] mx-auto relative bg-grid-gray-300/[0.2] sm:bg-grid-gray-600/[0] z-[10] py-4 sm:py-10">
        <div className="flex items-center justify-center flex-col sm:block px-2 sm:container">
          <p className="text-md">
            Welcome to <span className="text-primary">BL Sheet</span>{" "}
          </p>

          <h1 className="text-center sm:text-start text-xl sm:text-2xl md:text-4xl xl:text-5xl font-bold mt-8 text-primary">
            Simplifying Project Management
          </h1>

          <p className="text-sm mt-2 text-gray-600 text-center sm:text-start">
            BL Sheet is your ultimate tool for managing projects effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-4">
            <div className="flex items-center space-x-2 text-primary text-sm">
              <GoProject />
              <span>Project Management</span>
            </div>

            <div className="border-l border-black h-[10px] hidden sm:block" />

            <div className="flex items-center space-x-2 text-primary text-sm">
              <LuListTodo />
              <span>Task Management</span>
            </div>

            <div className="border-l border-black h-[10px] hidden sm:block" />

            <div className="flex items-center space-x-2 text-primary text-sm">
              <RiMoneyRupeeCircleLine />
              <span>Budget Management</span>
            </div>
          </div>

          <div className="space-x-3 flex items-center mt-4 ">
            <Link
              to={getStartedUrl}
              className="inline-flex text-white animate-shimmer items-center justify-center rounded-full border  bg-[linear-gradient(110deg,#2F667F,45%,#9ca3af,55%,#2F667F)] bg-[length:200%_100%] px-5 py-2 text-sm font-light transition-colors focus:outline-none"
            >
              Get Started
            </Link>
            <ProductHunt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
