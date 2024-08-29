import SheetAnalyticsCard from "../cards/sheet-analytics-card";
import { MatricsType } from "../../../../types";

interface CompProps {
  matrics: MatricsType[];
}

const DisplaySheetAnalyticsCards = ({ matrics }: CompProps) => {
  if (!matrics.length)
    return (
      <div className="flex items-center justify-center py-4">
        <p className="text-primary">Matrics not found! Please create sheet.</p>
      </div>
    );

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-4 gap-5 justify-items-center">
        {matrics.map((m) => (
          <SheetAnalyticsCard matrics={m} />
        ))}

        <SheetAnalyticsCard
          matrics={{
            type: "profit",
            total: matrics.reduce((r, b) => r + b.total, 0),
          }}
        />
      </div>
    </div>
  );
};

export default DisplaySheetAnalyticsCards;
