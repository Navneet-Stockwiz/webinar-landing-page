import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ContactPopup from "./ContactPopup";
import algosicon from "../../assets/svg/algosicon.svg";
import logouticon from "../../assets/svg/logouticon.svg";
import contacticon from "../../assets/svg/contacticon.svg";
import readymadeicon from "../../assets/svg/readymadeicon.svg";
import liveperfoicon from "../../assets/svg/liveperfoicon.svg";
import forwardtestingicon from "../../assets/svg/forwardtestingicon.svg";
import faqicon from "../../assets/svg/faqicon.svg";

const Sidebar = () => {
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const location = useLocation();

  const handleContactClick = (e) => {
    e.preventDefault();
    setContactPopupOpen(true);
  };

  // Custom logic for active tabs
  const isAlgoActive =
    location.pathname.startsWith("/backtest") &&
    !location.pathname.startsWith("/backtest/liveperformance");
  const isLiveActive = location.pathname.startsWith(
    "/backtest/liveperformance"
  );

  const navItems = [
    {
      name: "Algo Strategies",
      icon: algosicon,
      path: "/backtest",
      disabled: false,
      customActive: isAlgoActive,
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
      path: null,
      disabled: false,
      onClick: handleContactClick,
    },
    // {
    //   name: "Logout",
    //   icon: logouticon,
    //   path: "/",
    //   disabled: false,
    // },
  ];

  return (
    <>
      <aside className="fixed left-0 top-6 h-full w-[270px] border-r border-[#0000001F] flex flex-col">
        {/* Logo/Header */}
        <div className="p-4">
          <div className="text-xl font-bold text-gray-800">StrykeX</div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) =>
            item.disabled ? (
              <div
                key={item.name}
                className="group flex items-center p-2 cursor-not-allowed relative border border-transparent hover:border-[#407AFF] rounded-[8px] transition-all duration-300"
                style={{
                  width: "240px",
                  height: "48px",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="mr-3 relative z-10 opacity-50 group-hover:opacity-70 transition-all duration-300"
                />
                <span className="flex-1 font-medium text-[16px] leading-[100%] text-[#00000080] relative z-10 group-hover:opacity-70 transition-all duration-300">
                  {item.name}
                </span>
                {item.comingSoon && (
                  <span
                    className="ml-auto text-white text-xs absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    style={{
                      width: "104px",
                      height: "24px",
                      top: "12px",
                      left: "64px",
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
              <NavLink
                key={item.name}
                to={item.path}
                className={`relative flex items-center p-2 font-semibold text-[16px] leading-[100%] rounded-[8px] transition-all duration-300 group ${
                  item.customActive
                    ? "bg-[#407AFF12] text-[#407AFF]"
                    : "text-[#00000080] hover:bg-[#407AFF12] hover:text-[#407AFF]"
                }`}
                style={{
                  width: "240px",
                  height: "48px",
                }}
              >
                {item.customActive && (
                  <div className="absolute -right-4 h-12 w-1 bg-[#407AFF] rounded-tl-[8px] rounded-bl-[8px]" />
                )}
                <img
                  src={item.icon}
                  alt={item.name}
                  className={`mr-3 transition-all duration-300 ${
                    item.customActive
                      ? "grayscale-0 opacity-100"
                      : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                  }`}
                />
                <span className="flex-1 font-medium">{item.name}</span>
              </NavLink>
            )
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 pb-4 space-y-1">
          {bottomNavItems.map((item) =>
            item.onClick ? (
              <button
                key={item.name}
                onClick={item.onClick}
                className="group flex items-center p-2 font-semibold text-[16px] leading-[100%] rounded-[8px] transition-all duration-300 text-[#00000080] hover:bg-[#407AFF12] hover:text-[#407AFF] border border-transparent w-full text-left"
                style={{
                  width: "240px",
                  height: "48px",
                }}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="mr-3 transition-all duration-300 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <span className="flex-1 transition-all duration-300 font-medium">
                  {item.name}
                </span>
              </button>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center p-2 font-semibold text-[16px] leading-[100%] rounded-[8px] transition-all duration-300 group ${
                    isActive
                      ? "bg-[#FFF6F6] text-[#FF5D5D]"
                      : "text-[#00000080] hover:bg-[#FFF6F6] hover:text-[#FF5D5D] border border-transparent"
                  }`
                }
                style={{
                  width: "232px",
                  height: "48px",
                }}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute -right-3 h-12 w-1 bg-[#FF5D5D] rounded-tl-[8px] rounded-bl-[8px]" />
                    )}
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={`mr-3 transition-all duration-300 ${
                        isActive
                          ? "grayscale-0 opacity-100"
                          : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                      }`}
                    />
                    <span className="flex-1 transition-all duration-300 font-medium">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            )
          )}
        </div>
      </aside>

      <ContactPopup
        open={contactPopupOpen}
        onClose={() => setContactPopupOpen(false)}
      />
    </>
  );
};

export default Sidebar;
