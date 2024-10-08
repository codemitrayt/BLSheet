import DemoImg from "./helpers/demo-img";
import FeatureCards from "./helpers/feature-cards";
import Hero from "./helpers/hero";

const HomePage = () => {
  return (
    <div className="relative">
      <Hero />
      <DemoImg />
      <FeatureCards />
    </div>
  );
};

export default HomePage;
