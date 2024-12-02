import { useEffect } from "react";

import DemoImg from "./helpers/demo-img";
import FeatureCards from "./helpers/feature-cards";
import Hero from "./helpers/hero";
import PricingModal from "./helpers/pricing-modal";

const HomePage = () => {
  useEffect(() => {
    document.title = "BL Sheet Home";
  }, []);

  return (
    <div className="relative">
      <Hero />
      <DemoImg />
      <FeatureCards />
      <PricingModal />
    </div>
  );
};

export default HomePage;
