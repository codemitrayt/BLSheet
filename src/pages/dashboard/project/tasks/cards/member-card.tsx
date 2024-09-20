// import { TbTrash } from "react-icons/tb";
import { AssignUser } from "../../../../../types";

interface MemberCard {
  member: AssignUser;
}

const MemberCard = ({ member }: MemberCard) => {
  return (
    <div className="flex items-center justify-between border px-2 py-1 shadow-sm bg-secondary">
      <span className="text-white">{member.memberEmailId}</span>
      {/* <button className="text-red-500 hover:text-red-500/80 transition-all">
        <TbTrash />
      </button> */}
    </div>
  );
};

export default MemberCard;
