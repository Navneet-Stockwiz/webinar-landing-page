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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AlgoPage from "./pages/AlgoPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import Payoners from "./pages/Payoners.jsx";
import { PaymentDialogProvider } from "./hooks/PaymentDialogContext.jsx";
import NotFound from "./pages/NotFound.jsx";
import AlgoStrategy from "./pages/AlgoStrategy.jsx";
import AlgoDashboardLayout from "./layouts/AlgoDashboardLayout.jsx";
import Result from "./components/Result/Result.jsx";
import Contact from "./pages/Contact.jsx";
import StrykeXDesktopAuth from "./components/StrykeXAuth1.jsx";
import LivePerformance from "./pages/LivePerformance.jsx";
import StrykeXPopupDialog from "./components/StrykeXPopupDialog.jsx";

/** Scroll to top on route change (e.g. blogs list → blog post). */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PopupHandler = () => {
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      const timer = setTimeout(() => setPopupOpen(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setPopupOpen(false);
    }
  }, [location.pathname]);

  return (
    <StrykeXPopupDialog open={popupOpen} onClose={() => setPopupOpen(false)} />
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <PaymentDialogProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/kyc" element={<StrykeXDesktopAuth />} />
          <Route path="/algos" element={<AlgoPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/getstarted" element={<DhanUI />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/payoners" element={<Payoners />} />
          <Route path="/backtest" element={<AlgoDashboardLayout />}>
            <Route index element={<AlgoStrategy />} />
            <Route path="results" element={<Result />} />
            <Route path="liveperformance" element={<LivePerformance />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PaymentDialogProvider>
      <PopupHandler />
    </Router>
  );
};

export default App;
