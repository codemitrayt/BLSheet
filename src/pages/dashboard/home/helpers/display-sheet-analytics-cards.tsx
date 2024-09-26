import SheetAnalyticsCard from "../cards/sheet-analytics-card";
import { MatricsType } from "../../../../types";
import { calculateProfilt } from "../../../../utils";

interface CompProps {
  matrics: MatricsType[];
}

const DisplaySheetAnalyticsCards = ({ matrics }: CompProps) => {
  if (!matrics.length)
    return (
      <div className="flex items-center justify-center py-4">
        <p className="text-primary text-sm font-medium text-center">
          No sheet analytics available. Please create a new sheet to see the
          data.
        </p>
      </div>
    );

  return (
    <div className="w-full relative">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
        {matrics.map((m, index) => (
          <SheetAnalyticsCard matrics={m} key={index} />
        ))}

        <SheetAnalyticsCard
          matrics={{
            type: "profit",
            total: calculateProfilt(matrics),
          }}
        />
      </div>
    </div>
  );
};

export default DisplaySheetAnalyticsCards;
