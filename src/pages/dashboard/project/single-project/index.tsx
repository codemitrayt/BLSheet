import ProjectDetails from "./components/project-details";
import RecentProjectTask from "./components/recent-project-task";

const SingleProjectPage = () => {
  return (
    <div className="relative h-full overflow-y-auto pb-8">
      <ProjectDetails />
      <RecentProjectTask />
    </div>
  );
};

export default SingleProjectPage;
