import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import mainlogo from "../../assets/svg/mainlogo.svg";
import { useNavigate } from "react-router-dom";
import { AnimateFromInside } from "../../common/ScrollFadeIn";
import { VideoTutorialModal } from "../VideoTutorialModal";

const HEADER_HEIGHT = 80;
const NAV_ITEMS = [
  "Home",
  "Features",
  "Algos",
  "Pricing",
  "Funded Accounts",
];

const getIdFromLabel = (label) => label.toLowerCase().replace(/\s/g, "");

const Header = () => {
  const [activeId, setActiveId] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      NAV_ITEMS.forEach((item) => {
        const id = getIdFromLabel(item);
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            setActiveId(id);
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - HEADER_HEIGHT,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full md:px-40 px-4">
      <div className="bg-white/5 backdrop-blur-[30px] rounded-[20px] md:px-6 px-4 md:py-3 py-2">
        <nav className="relative flex items-center justify-between">
          {/* Logo */}
          <AnimateFromInside>
            <div className="flex items-center z-10">
              <a href="/" className="flex items-center gap-2">
                <img
                  src={mainlogo}
                  alt="Main Logo"
                  className="md:h-[35px] h-[23px]"
                />
              </a>
            </div>
          </AnimateFromInside>

          {/* Desktop Navigation */}
          <AnimateFromInside>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:flex hidden gap-6 items-center">
              {NAV_ITEMS.map((item) => {
                const id = getIdFromLabel(item);
                const isActive = activeId === id;
                const isComingSoon = item.includes("(Coming Soon)");
                const label = isComingSoon
                  ? item
                  : item;

                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-[18px] leading-[100%] font-normal transition ${
                      isActive
                        ? "text-white font-extrabold"
                        : "text-white/70 hover:text-white"
                    }`}
                    disabled={isComingSoon}
                  >
                    {label}
                    {item === "Funded Accounts" && (
                      <span className="text-[12px] text-white/50 ml-1">
                        (Coming Soon)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </AnimateFromInside>

          {/* Desktop CTA Buttons */}
          <AnimateFromInside>
            <div className="md:flex hidden gap-3 items-center z-10">
              <button
                onClick={() => navigate("/signin")}
                className="bg-white text-black text-[14px] leading-[100%] font-medium px-4 py-3 rounded-full hover:bg-gray-100 transition"
              >
                SignIn /Up
              </button>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="border border-white/60 text-white text-[14px] leading-[100%] font-medium px-4 py-3 rounded-full hover:bg-white hover:text-black transition flex items-center gap-1"
              >
                Watch Tutorial <span className="text-xs ml-1" aria-hidden>▶</span>
              </button>
            </div>
          </AnimateFromInside>

          {/* Mobile Menu Button with Animation */}
          <div className="md:hidden flex items-center z-10">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-8 h-8 focus:outline-none"
              aria-label="Toggle mobile menu"
              initial={false}
              animate={mobileMenuOpen ? "open" : "closed"}
              variants={{
                open: {},
                closed: {},
              }}
            >
              {/* Top bar */}
              <motion.span
                className="absolute top-[6px] left-0 w-8 h-[2px] bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8.5 },
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Middle bar */}
              <motion.span
                className="absolute top-[14px] left-0 w-8 h-[2px] bg-white"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Bottom bar */}
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

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden mt-2 bg-white/10 backdrop-blur-[20px] rounded-[20px] p-4 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const id = getIdFromLabel(item);
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-white text-left text-[18px] font-medium"
                  >
                    {item}
                    {item === "Funded Accounts" && (
                      <span className="text-[10px] px-2 py-[2px] rounded-full text-white font-medium">
                        (Coming Soon)
                      </span>
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => navigate("/signin")}
                className="bg-white text-black text-[14px] font-medium px-4 py-3 rounded-full hover:bg-gray-100 transition mt-2"
              >
                SignIn /Up
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setVideoOpen(true);
                }}
                className="border border-white/60 text-white text-[14px] font-medium px-4 py-3 rounded-full hover:bg-white hover:text-black transition flex items-center gap-1"
              >
                Watch Tutorial <span className="text-xs ml-1" aria-hidden>▶</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoTutorialModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </header>
  );
};

export default Header;
