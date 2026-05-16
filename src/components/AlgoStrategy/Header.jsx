// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";
import { useSelector, useDispatch } from "react-redux";
import { setPageTitle, resetPageTitle } from "../../redux/slices/pageTitleSlice";

import xicon1 from "../../assets/svg/strykexblack.svg";
import SearchIcon from "@mui/icons-material/Search";
import algosicon from "../../assets/svg/algosicon.svg";
import contacticon from "../../assets/svg/contacticon.svg";
import readymadeicon from "../../assets/svg/readymadeicon.svg";
import liveperfoicon from "../../assets/svg/liveperfoicon.svg";
import forwardtestingicon from "../../assets/svg/forwardtestingicon.svg";
import faqicon from "../../assets/svg/faqicon.svg";
import backbuttonicon from "../../assets/svg/backbuttonicon.svg";
import backtesticonnew from "../../assets/svg/backtesticonnew.svg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();
  const dispatch = useDispatch();
  const pageTitle = useSelector((state) => state.pageTitle.title);

  // ✅ Nav items (Ready-made, Forward, FAQ disabled)
  const navItems = [
    {
      name: "Algo Strategies",
      icon: algosicon,
      path: "/backtest",
      disabled: false,
      comingSoon: false,
    },
    {
      name: "Live Performance",
      icon: liveperfoicon,
      path: "/backtest/liveperformance",
      disabled: true,
      comingSoon: true,
    },
    {
      name: "Ready Made Portfolios",
      icon: readymadeicon,
      path: "/backtest/portfolios",
      disabled: true,
      comingSoon: true,
    },
    {
      name: "Forward Testing",
      icon: forwardtestingicon,
      path: "/testing",
      disabled: true,
      comingSoon: true,
    },
    {
      name: "FAQs & Tutorials",
      icon: faqicon,
      path: "/faqs",
      disabled: true,
      comingSoon: true,
    },
  ];

  const bottomNavItems = [
    {
      name: "Contact Us",
      icon: contacticon,
      path: "/backtest/contact",
      disabled: false,
      comingSoon: false,
    },
  ];

  const handleMenuClick = (item) => {
    if (!item.disabled) {
      navigate(item.path);
      setMobileMenuOpen(false);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
  };

  const handleMobileSearchClick = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };

  const handleBackClick = () => navigate(-1);

  // ✅ Active state logic
  const isAlgoActive =
    location.pathname.startsWith("/backtest") &&
    !location.pathname.startsWith("/backtest/liveperformance");
  const isLiveActive = location.pathname.startsWith("/backtest/liveperformance");

  // Route checks for UI
  const isBacktestResultsRoute = location.pathname === "/backtest/results";
  const isBacktestRoute = location.pathname === "/backtest";
  const isChooseTestRoute = location.pathname === "/choose-test";
  const isContactPage = location.pathname === "/backtest/contact";

  const shouldHideNavElements =
    isBacktestResultsRoute || isChooseTestRoute || isContactPage;

  useEffect(() => {
    if (isContactPage) {
      dispatch(setPageTitle("Contact"));
    } else if (isBacktestResultsRoute) {
      dispatch(
        setPageTitle(location.state?.strategy?.name || "Backtest Results")
      );
    } else if (isChooseTestRoute) {
      dispatch(setPageTitle("Backtest Terminal"));
    } else if (isBacktestRoute) {
      dispatch(setPageTitle("Algo Strategy"));
    } else {
      dispatch(resetPageTitle());
    }
  }, [location, dispatch]);

  return (
    <>
      {/* Header */}
      <header
        className="bg-white md:px-8 py-6 fixed top-0 right-0 left-0 z-50 md:border-none border-b border-[#DCDCDC] backdrop-blur-[50px]"
        style={{ height: "84px" }}
      >
        <div className="flex items-center justify-between px-4 md:px-0 h-full">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center md:space-x-8">
              {/* Desktop Logo */}
              <img
                src={xicon1}
                alt="Logo"
                className="object-cover md:block hidden"
              />

              {/* Desktop Title */}
              <div className="hidden md:flex gap-2 pl-[115px] items-center">
                {isBacktestRoute && <img src={backtesticonnew} alt="icon" />}
                <p className="font-semibold md:text-[24px] text-[16px] leading-[100%]">
                  {pageTitle}
                </p>
              </div>

              {/* Mobile Title */}
              {!shouldHideNavElements && (
                <div className="md:hidden flex items-center gap-2">
                  {isBacktestRoute && (
                    <img
                      src={backtesticonnew}
                      alt="icon"
                      className="w-[25px]"
                    />
                  )}
                  <p className="font-semibold text-[16px] leading-[100%]">
                    {pageTitle}
                  </p>
                </div>
              )}

              {/* Back buttons for special routes */}
              {(isBacktestResultsRoute ||
                isChooseTestRoute ||
                isContactPage) && (
                <div className="md:hidden flex gap-2 items-center">
                  <button
                    onClick={handleBackClick}
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                    aria-label="Go back"
                  >
                    <img src={backbuttonicon} alt="Back" />
                  </button>
                  <p className="font-bold text-[16px] leading-[100%]">
                    {pageTitle}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search + Menu */}
          {!shouldHideNavElements && (
            <div className="md:hidden flex items-center z-50 gap-3">
              {!isContactPage && (
                <button
                  onClick={handleMobileSearchClick}
                  className="hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Toggle search"
                >
                  <SearchIcon />
                </button>
              )}

              {/* Hamburger */}
              <motion.button
                onClick={handleMobileMenuClick}
                className="relative"
                style={{ width: "30px", height: "30px" }}
                aria-label="Toggle menu"
                initial={false}
                animate={mobileMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="absolute top-[6px] left-0 h-[2px] bg-black"
                  style={{ width: "30px" }}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                />
                <motion.span
                  className="absolute top-[14px] left-0 h-[2px] bg-black"
                  style={{ width: "30px" }}
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                />
                <motion.span
                  className="absolute bottom-[6px] left-0 h-[2px] bg-black"
                  style={{ width: "30px" }}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                />
              </motion.button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Search Input */}
      {!isContactPage && (
        <AnimatePresence>
          {mobileSearchOpen && !shouldHideNavElements && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-[84px] left-0 right-0 z-40 md:hidden bg-white border-b border-[#DCDCDC]"
            >
              <div className="px-4 py-3">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative flex items-center border border-[#D6D6D6] rounded-[8px] w-full bg-white focus-within:ring-1 focus-within:ring-[#407AFF] focus-within:border-[#407AFF]">
                    <input
                      type="text"
                      placeholder="Type to search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="flex-1 px-4 py-3 pr-12 bg-transparent border-none outline-none text-sm placeholder-gray-400 rounded-[8px]"
                      autoFocus={mobileSearchOpen}
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && !shouldHideNavElements && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[84px] left-0 right-0 z-40 md:hidden bg-white shadow-lg"
            style={{ maxHeight: "calc(100vh - 84px)", overflowY: "auto" }}
          >
            <div className="p-4">
              {/* Main Navigation */}
              <div className="space-y-2 mb-4">
                {navItems.map((item) =>
                  item.disabled ? (
                    <div
                      key={item.name}
                      className="flex items-center p-2 cursor-not-allowed relative rounded-[8px]"
                      style={{
                        width: "100%",
                        height: "48px",
                        opacity: 1,
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="mr-3 w-5 h-5"
                        style={{ filter: "grayscale(100%) opacity(0.5)" }}
                      />
                      <span className="flex-1 font-semibold text-[16px] text-[#00000080]">
                        {item.name}
                      </span>
                      {item.comingSoon && (
                        <span
                          className="ml-auto text-white text-xs flex items-center justify-center font-medium"
                          style={{
                            width: "104px",
                            height: "24px",
                            borderRadius: "86.4px",
                            background:
                              "linear-gradient(274.11deg, #31BCFD -10.9%, #1D4AFF 45.72%, #5286FF 104.51%)",
                          }}
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => handleMenuClick(item)}
                      className={`relative flex items-center p-2 font-semibold text-[16px] rounded-[8px] transition-all w-full text-left ${
                        (item.name === "Algo Strategies" && isAlgoActive) ||
                        (item.name === "Live Performance" && isLiveActive)
                          ? "bg-[#407AFF12] text-[#407AFF]"
                          : "text-[#00000080] hover:bg-[#407AFF12] hover:text-[#407AFF]"
                      }`}
                      style={{ height: "48px" }}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="mr-3 w-5 h-5"
                        style={{
                          filter:
                            (item.name === "Algo Strategies" && isAlgoActive) ||
                            (item.name === "Live Performance" && isLiveActive)
                              ? "none"
                              : "grayscale(100%) opacity(0.5)",
                        }}
                      />
                      <span className="flex-1">{item.name}</span>
                    </button>
                  )
                )}
              </div>

              {/* Separator */}
              <hr className="border-[#0000001F] my-4" />

              {/* Bottom Nav */}
              <div className="space-y-2">
                {bottomNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMenuClick(item)}
                    className={`flex items-center p-2 font-semibold text-[16px] rounded-[8px] w-full text-left ${
                      location.pathname === item.path
                        ? "bg-[#407AFF12] text-[#407AFF]"
                        : "text-[#00000080] hover:bg-[#407AFF12] hover:text-[#407AFF]"
                    }`}
                    style={{ height: "48px" }}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="mr-3 w-5 h-5"
                      style={{
                        filter:
                          location.pathname === item.path
                            ? "none"
                            : "grayscale(100%) opacity(0.5)",
                      }}
                    />
                    <span className="flex-1">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
