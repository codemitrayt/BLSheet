import { TbEdit } from "react-icons/tb";
import { useState } from "react";
import { Drawer, Tooltip } from "antd";

import { LuChevronRightCircle } from "react-icons/lu";

import EditSheetForm from "../forms/edit-sheet-form";
import { BLSheet } from "../../../../types";

interface EditProps {
  sheet: BLSheet;
  refetchBLSheets: () => void;
}

const Edit = ({ sheet, refetchBLSheets }: EditProps) => {
  const [drawerState, setDrawerState] = useState(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div>
      <Tooltip title="Edit sheet">
        <button
          onClick={onOpenDrawer}
          className="text-emerald-500 flex items-center justify-center hover:text-emerald-500/80 transition"
        >
          <TbEdit />
        </button>
      </Tooltip>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Edit Sheet</span>}
      >
        <EditSheetForm
          sheet={sheet}
          refetchBLSheet={refetchBLSheets}
          onCloseDrawer={onCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default Edit;
