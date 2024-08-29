import TotalMoneyDistributedAnalytics from "./charts/total-money-distributed-analytics";

const DashboardHomePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="flex items-center justify-center bg-turnary rounded-lg border p-2">
        <TotalMoneyDistributedAnalytics />
      </div>
    </div>
  );
};

export default DashboardHomePage;
