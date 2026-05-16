import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signin from "./pages/Signin.jsx";
import DhanUI from "./pages/DhanUI.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import StrykeXDesktopAuth from "./components/StrykeXAuth1.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/kyc" element={<StrykeXDesktopAuth />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/getstarted" element={<DhanUI />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
