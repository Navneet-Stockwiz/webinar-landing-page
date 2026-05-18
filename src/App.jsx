import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signin from "./pages/Signin.jsx";
import DhanUI from "./pages/DhanUI.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PayOrderTab from "./pages/PayOrderTab.jsx";
import NotFound from "./pages/NotFound.jsx";
import WebinarThankYou from "./pages/WebinarThankYou.jsx";
import StrykeXDesktopAuth from "./components/StrykeXAuth1.jsx";
import {
  LandingVariantProvider,
  LANDING_PATHS,
} from "./contexts/LandingVariantContext.jsx";
import WebinarDataLayer from "./components/WebinarDataLayer.jsx";
import { trackVisit } from "./utils/tracking";

const PageTracker = () => {
  useEffect(() => {
    trackVisit();
  }, []);

  return null;
};

const App = () => {
  return (
    <Router>
      <PageTracker />
      <LandingVariantProvider>
        <WebinarDataLayer />
        <Routes>
          <Route path="/" element={<Navigate to={LANDING_PATHS.G_ALGO_FREE} replace />} />
          <Route path={LANDING_PATHS.G_ALGO_FREE} element={<LandingPage />} />
          <Route path={LANDING_PATHS.G_ALGO_PAID} element={<LandingPage />} />
          <Route path={LANDING_PATHS.M_ALGO_FREE} element={<LandingPage />} />
          <Route path={LANDING_PATHS.M_ALGO_PAID} element={<LandingPage />} />
          <Route path={LANDING_PATHS.TESTMARK_ALGO_FREE} element={<LandingPage />} />
          <Route path={LANDING_PATHS.TESTMARK_ALGO_PAID} element={<LandingPage />} />
          <Route path="/kyc" element={<StrykeXDesktopAuth />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/getstarted" element={<DhanUI />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/pay-order" element={<PayOrderTab />} />
          <Route path="/g-thankyou" element={<WebinarThankYou />} />
          <Route path="/m-thankyou" element={<WebinarThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LandingVariantProvider>
    </Router>
  );
};

export default App;
