import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { RiProgress3Fill } from "react-icons/ri";

export const TODO_STATUS_ICON = {
  pending: <MdPending className="text-black" />,
  in_progress: <RiProgress3Fill className="text-black" />,
  completed: <IoIosCheckmarkCircle className="text-black" />,
};
