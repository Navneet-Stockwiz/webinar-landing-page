import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Hero from "../components/Hero.jsx";
import AILogoSection from "../components/AILogoSection.jsx";
import WebinarHighlights from "../components/WebinarHighlights.jsx";
import AlgoTradingBots from "../components/AlgoTradingBots.jsx";
import Faq from "../components/Faq.jsx";
import ThreeMInutesVideo from "../components/ThreeMInutesVideo.jsx";
import CompanyLogoMarquee from "../components/CompanyLogoMarquee.jsx";
import WebinarBonus from "../components/WebinarBonus.jsx";
import Coach from "../components/Coach.jsx";
import Certified from "../components/Certified.jsx";
import SuperTraders from "../components/SuperTraders.jsx";
import Quotes from "../components/Quotes.jsx";

const LandingPage = () => {
  return (
    <MainLayout>
      <div id="home">
        <Hero />
      </div>
      <div>
        <AILogoSection />
      </div>
      <div>
        <ThreeMInutesVideo />
      </div>
      <div>
        <WebinarHighlights />
      </div>
      <div>
        <CompanyLogoMarquee />
      </div>
        <div>
          <AlgoTradingBots />
        </div>
        <div>
          <WebinarBonus />
        </div>
        <div>
          <Coach />
        </div>
        <div>
          <Certified />
        </div>
        <div>
          <Quotes />
        </div>
        <div>
          <SuperTraders />
        </div>
      <div>
        <Faq />
      </div>
    </MainLayout>
  );
};

export default LandingPage;
