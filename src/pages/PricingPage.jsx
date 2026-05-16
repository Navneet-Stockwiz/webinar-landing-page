
import React from "react";
import Pricing from "../components/Pricing.jsx";
import Faq from "../components/Faq.jsx";
import LightningFast from "../components/LightningFast.jsx";
import PricingLayout from "../layouts/PricingLayout.jsx";

const PricingPage = () => {
  return (
    <PricingLayout>
      <div id="pricing">
        <Pricing />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <LightningFast />
      </div>
    </PricingLayout>
  );
};

export default PricingPage;
