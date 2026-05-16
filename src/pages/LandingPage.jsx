import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Hero from "../components/Hero.jsx";
import Feature from "../components/Feature.jsx";
import ExclusiveFeatures from "../components/ExclusiveFeatures.jsx";
import StrykeXAdvantage from "../components/StrykeXAdvantage.jsx";
import Works from "../components/Works.jsx";
import Pricing from "../components/Pricing.jsx";
import Faq from "../components/Faq.jsx";
import LightningFast from "../components/LightningFast.jsx";

const LandingPage = () => {
  return (
    <MainLayout>
      <div id="home">
        <Hero />
      </div>
      <div id="features">
        <Feature />
      </div>
      <div>
        <ExclusiveFeatures />
      </div>
      <div>
        <StrykeXAdvantage />
      </div>
      <div>
        <Works />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div>
        <Faq />
      </div>
      <LightningFast />
    </MainLayout>
  );
};

export default LandingPage;
