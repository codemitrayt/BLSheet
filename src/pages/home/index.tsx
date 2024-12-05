import { useEffect } from "react";

import DemoImg from "./helpers/demo-img";
import FeatureCards from "./helpers/feature-cards";
import Hero from "./helpers/hero";

const HomePage = () => {
  useEffect(() => {
    document.title = "BL Sheet: Simplifying project management";
  }, []);

  return (
    <div className="relative">
      <Hero />
      <DemoImg />
      <FeatureCards />
    </div>
  );
};

export default HomePage;
