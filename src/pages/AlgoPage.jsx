import React from "react";
import Pricing from "../components/Pricing.jsx";
import Hero from "../components/Algo/Hero.jsx";
import AlgosLayout from "../layouts/AlgosLayout.jsx";
import Strategies from "../components/Algo/Strategies.jsx";
import OwnStrategy from "../components/Algo/OwnStrategy.jsx";
import AutoPilot from "../components/Algo/AutoPilot.jsx";

const AlgoPage = () => {
  return (
    <AlgosLayout>
      <div id="home">
        <Hero />
      </div>
      <div>
        <Strategies />
      </div>
      <div id="OwnStrategy">
        <OwnStrategy />
      </div>
      <div id="AutoPilot">
        <AutoPilot />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
    </AlgosLayout>
  );
};

export default AlgoPage;
