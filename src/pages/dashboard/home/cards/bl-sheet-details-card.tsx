import { Tag } from "antd";
import dateFormat from "dateformat";

import { BLSheet, SheetType } from "../../../../types";
import { currencyFormate } from "../../../../utils";

import { AiFillCalendar } from "react-icons/ai";

interface BLSheetDetailsProps {
  sheet: BLSheet;
}

const BLSheetDetailsCard = ({ sheet }: BLSheetDetailsProps) => {
  return (
    <div
      key={sheet._id}
      className="border shadow-sm bg-gray-100 rounded-lg p-3"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-sm font-medium">{sheet.clientName}</h1>
        <Tag
          className="rounded-full w-[90px] flex items-center justify-center"
          color={
            sheet.type === SheetType.INCOME
              ? "green"
              : sheet.type === SheetType.EXPENSE
              ? "red"
              : "orange"
          }
        >
          {sheet.type}
        </Tag>
      </div>
      <p className="py-2 text-sm text-gray-600">{sheet.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-800">
          {currencyFormate(sheet.money)}
        </span>
        <div className="flex items-center justify-center space-x-1 text-primary">
          <AiFillCalendar />
          <span className="text-xs">
            {dateFormat(sheet.date, "dd/mm/yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BLSheetDetailsCard;
