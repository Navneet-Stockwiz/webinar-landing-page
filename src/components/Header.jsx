import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import mainlogo from "../assets/svg/mainlogo.svg";
import whatsappIcon from "../assets/svg/whatsappiconnew.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useWebinar } from "../contexts/WebinarContext";
import { useLanguage } from "../contexts/LanguageContext";
import StrykeXPopupDialog from "./StrykeXPopupDialog";

const HEADER_HEIGHT = 80;
const NAV_ITEMS = [];
const getIdFromLabel = (label) => label.toLowerCase().replace(/\s/g, "");

const Header = () => {
  const [activeId, setActiveId] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { webinarData } = useWebinar();
  const { selectedLanguage, selectLanguage, clearLanguage } = useLanguage();

  // Track scroll position for active section (only on homepage)
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") return;
      for (const item of NAV_ITEMS) {
        const id = getIdFromLabel(item);
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - HEADER_HEIGHT,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (item) => {
    const id = getIdFromLabel(item);
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 300);
    } else {
      scrollToSection(id);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setPendingAction(null);
    clearLanguage();
  };

  const handleDialogSuccess = () => {
    if (pendingAction) {
      pendingAction();
    }
  };

  const handleSignUp = () => {
    // Set default language to english when opening from header
    selectLanguage("english");
    setShowDialog(true);
  };

  return (
    <header className="fixed md:top-8 top-6 left-1/2 transform -translate-x-1/2 z-50 w-full md:px-40 px-4">
      <div className="bg-[#0000005C] backdrop-blur-[30px] rounded-[20px] px-4 md:py-3 py-2">
        <nav className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center z-10">
            <a href="/" className="flex items-center gap-2">
              <img
                src={mainlogo}
                alt="Main Logo"
                className="md:h-[35px] h-[23px]"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:flex hidden gap-10 items-center">
            {NAV_ITEMS.map((item) => {
              const id = getIdFromLabel(item);
              const isActive = activeId === id && location.pathname === "/";
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(item)}
                  className={`text-[18px] leading-[100%] font-normal transition ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="md:flex hidden gap-3 items-center z-10">
            <button
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send/?phone=916350670245&text=Hello%2C%0AI+just+visited+your+website%2C+I+am+interested+in+joining+the+webinar.+Please+share+the+webinar+joining+details.%0AStockwiz%0Ahttps%3A%2F%2Falpha.stockwiz.in%2F&type=phone_number&app_absent=0",
                  "_blank"
                )
              }
              className="border border-[#FFFFFF57] text-white p-3 rounded-[11px] hover:bg-white/10 transition"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="object-cover" />
            </button>
            <button
              onClick={handleSignUp}
              className="border border-[#FFFFFF57] text-white text-[14px] font-medium py-3 px-8 rounded-[11px] hover:bg-white/10 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile CTA & Toggle here will be auto disconnected on scroll */}
          <div className="md:hidden flex items-center gap-2 z-10">
            <button
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send/?phone=916350670245&text=Hello%2C%0AI+just+visited+your+website%2C+I+am+interested+in+joining+the+webinar.+Please+share+the+webinar+joining+details.%0AStockwiz%0Ahttps%3A%2F%2Falpha.stockwiz.in%2F&type=phone_number&app_absent=0",
                  "_blank"
                )
              }
              className="border border-white/60 text-white p-2 rounded-lg hover:bg-white/10 transition"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" />
            </button>
            <button
              onClick={handleSignUp}
              className="border border-white/60 text-white text-[12px] font-medium px-3 py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              Sign Up
            </button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-8 h-8 hidden"
              aria-label="Toggle mobile menu"
              initial={false}
              animate={mobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute top-[6px] left-0 w-8 h-[2px] bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8.5 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute top-[14px] left-0 w-8 h-[2px] bg-white"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute bottom-[6px] left-0 w-8 h-[2px] bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8.5 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-2 bg-white/10 backdrop-blur-[20px] rounded-[20px] p-4 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const id = getIdFromLabel(item);
                const isActive = activeId === id && location.pathname === "/";
                return (
                  <button
                    key={id}
                    onClick={() => handleNavClick(item)}
                    className={`text-left text-[18px] font-medium ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
              <button
                onClick={handleSignUp}
                className="bg-white text-black text-[14px] font-medium px-4 py-3 rounded-full hover:bg-gray-100 transition mt-2"
              >
                Sign Up
              </button>
              <button className="border border-white/60 text-white text-[14px] font-medium px-4 py-3 rounded-full hover:bg-white hover:text-black transition flex items-center gap-1 justify-center">
                Watch Tutorial <span className="text-xs ml-1">▶</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog Component */}
      <StrykeXPopupDialog
        open={showDialog}
        onClose={handleDialogClose}
        onSuccess={handleDialogSuccess}
        selectedLanguage={selectedLanguage}
      />
    </header>
  );
};

export default Header;
