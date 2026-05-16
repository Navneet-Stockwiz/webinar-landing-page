import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ra from "../assets/webp/ra_result.webp";
import rb from "../assets/webp/rb_result.webp";
import rc from "../assets/webp/rc_result.webp";
import rd from "../assets/webp/rd_result.webp";
import re from "../assets/webp/re_result.webp";
import rf from "../assets/webp/rf_result.webp";
import rg from "../assets/webp/rg_result.webp";
import rh from "../assets/webp/rh_result.webp";
import ri from "../assets/webp/ri_result.webp";
import rj from "../assets/webp/rj_result.webp";
import { AnimateFromInside } from "../common/ScrollFadeIn";

// Avatar placeholder component for names without images
const AvatarPlaceholder = ({ name, size = "w-10 h-10" }) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`${size} rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold`}
    >
      {firstLetter}
    </div>
  );
};

const reviews = [
  {
    title: "Algo Trading Made Accessible with No-Code",
    image: ra,
    content:
      "Finally, a trading system that doesn't need coding skills! The no-code builder made it so easy to automate my strategies. I never thought algo trading could be this accessible.",
    name: "Pragya",
    occupation: "Senior Analyst at Accenture",
  },
  {
    title: "AI Trading Simplified in Just a Few Clicks",
    image: rb,
    content:
      "AI-driven trading sounded complicated at first, but this webinar showed me how simple it can be. With just a few clicks, I can now run strategies that earlier took me hours to manage manually.",
    name: "Ishaan Talwar",
    occupation: "Hotelier",
  },
  {
    title: "My 24x7 AI Trading Assistant",
    image: rc,
    content:
      "The best part? I don't need to sit in front of charts anymore. My trades are executed automatically while I focus on work. It's like having a 24x7 trading assistant powered by AI.",
    name: "Umesh Singla",
    occupation: "Civil Judge",
  },
  {
    title: "Next-Gen Trading with AI & Automation",
    image: rd,
    content:
      "I loved how the webinar combined AI with no-code automation. The strategies adapt to market moves automatically—no manual tracking needed. Truly next-gen trading!",
    name: "Akash Jah",
    occupation: "Entrepreneur",
  },
  {
    title: "Beginner-Friendly, AI-Powered Trading",
    image: re,
    content:
      "I always thought algo trading was only for coders. This session proved me wrong. The platform is beginner-friendly, AI-powered, and does all the heavy lifting for you.",
    name: "Bharat Lohiya",
    occupation: "Student at IIT Kharagpur",
  },
  {
    title: "Game-Changing AI Tools for Traders",
    image: rf,
    content:
      "The AI tools explained here are game-changers. They scan markets, pick trades, and execute without me clicking a button. Zero coding required—just pure automation!",
    name: "Mriganka",
    occupation: "Digital Marketing Expert",
  },
  {
    title: "AI Handles Trading While I Handle Business",
    image: rg,
    content:
      "No-code trading is the future. In this webinar, I set up my first automated strategy in minutes. Now AI handles execution while I focus on scaling my business.",
    name: "Nilesh",
    occupation: "Real Estate Broker",
  },
  {
    title: "Institutional-Grade Trading for Retail Users",
    image: rh,
    content:
      "The AI-powered scanners and bots blew me away. They eliminate guesswork and execute trades automatically. It feels like institutional-grade trading made available to retail users.",
    name: "Adv. Madhav Bansal",
    occupation: "Lawyer",
  },
  {
    title: "Trading Like a Pro Without Coding",
    image: ri,
    content:
      "Being new to trading, I was nervous. But the AI automation tools made it simple—I don't need advanced knowledge or coding to trade like a pro.",
    name: "Aditi Agarwal",
    occupation: "Chartered Accountant",
  },
  {
    title: "Never Miss a Trade Again with AI Automation",
    image: rj,
    content:
      "I used to miss trades while working. Now, with AI automation, my strategies run in the background nonstop. This webinar was the turning point for me.",
    name: "Anurag Sablania",
    occupation: "Fashion Designer",
  },
];

const SuperTraders = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Event handlers
  const handleTouchStart = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  // Autoplay functionality with Framer Motion
  useEffect(() => {
    if (!isPaused) {
      const cardWidth = 328; // card width (320) + gap (8)
      const totalWidth = reviews.length * cardWidth;
      // Slower animation for mobile (35s) vs desktop (20s)
      const animationDuration = isMobile ? 35 : 20;

      const startAutoPlay = async () => {
        await controls.set({ x: 0 });

        controls.start({
          x: -totalWidth,
          transition: {
            duration: animationDuration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      };

      const timer = setTimeout(startAutoPlay, 100);
      return () => {
        clearTimeout(timer);
        controls.stop();
      };
    } else {
      controls.stop();
    }
  }, [isPaused, controls, reviews.length, isMobile]);

  return (
    <div className="flex flex-col items-center justify-center gap-6  bg-[#010611] w-full h-auto md:pt-28 pt-20 md:pb-8 relative overflow-hidden">
      <div className="flex justify-center w-full md:px-80 3xl:px-[450px] px-4">
        <AnimateFromInside>
          <h2 className="font-semibold text-white md:text-[56px] text-[32px] md:leading-[74px] leading-[36px] font-degular text-center">
            <span className="text-[#FFFFFF99] font-normal">
              Hear It From Our <br className="md:hidden block" />
            </span>
            Super Traders
          </h2>
        </AnimateFromInside>
      </div>

      {/* Desktop Layout - Auto-scroll marquee */}
      <div className="hidden md:block overflow-hidden group w-full">
        <div className="flex items-center gap-12 h-auto md:animate-marquee animate-marquee1 group-hover:[animation-play-state:paused] will-change-transform">
          {[...reviews, ...reviews, ...reviews, ...reviews].map(
            (review, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-[#FFFFFF1F] w-[320px] min-h-[300px] h-auto p-4 rounded-lg shrink-0"
              >
                <div className="flex flex-col gap-4">
                  <p className="font-degular font-semibold md:text-[24px] leading-[100%] text-[#FFFFFF] overflow-hidden">
                    {review.title}
                  </p>
                  <p className="font-normal md:text-[16px] text-[13px] md:leading-[24px] leading-[20px] text-[#FFFFFFBF]">
                    {review.content}
                  </p>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt="reviewavatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold md:text-[15px] text-[14px] leading-[100%] text-[#FFFFFFBF]">
                        {review.name}
                      </p>
                      <p className="font-normal text-[12px] leading-[100%] text-[#FFFFFF99]">
                        {review.occupation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Layout - Framer Motion carousel with drag */}
      <div
        className="md:hidden overflow-hidden w-screen -mx-4"
        ref={containerRef}
      >
        <AnimateFromInside>
          <motion.div
            className="flex items-center gap-4 h-auto px-4"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -reviews.length * 268, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleTouchStart}
            onDragEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ x: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* First set of cards */}
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col justify-between bg-[#FFFFFF1F] w-[260px] min-h-[260px] h-auto p-4 rounded-lg">
                  <div className="flex flex-col md:gap-4 gap-3">
                    <p className="font-degular font-semibold text-[18px] leading-[110%] text-[#FFFFFF]">
                      {review.title}
                    </p>
                    <p className="font-normal text-sm text-[#FFFFFFBF]">
                      {review.content}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex items-center gap-4">
                      <img
                        src={review.image}
                        alt="reviewavatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-[12px] leading-[100%] text-[#FFFFFFBF]">
                          {review.name}
                        </p>
                        <p className="font-normal text-[10px] leading-[100%] text-[#FFFFFF99]">
                          {review.occupation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Duplicate set for seamless loop */}
            {reviews.map((review, index) => (
              <motion.div
                key={`duplicate-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col justify-between bg-[#FFFFFF1F] w-[260px] min-h-[260px] h-auto p-4 rounded-lg">
                  <div className="flex flex-col md:gap-4 gap-3">
                    <p className="font-degular font-semibold text-[18px] leading-[100%] text-[#FFFFFF]">
                      {review.title}
                    </p>
                    <p className="font-normal text-[12px] leading-[18px] text-[#FFFFFFBF]">
                      {review.content}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex items-center gap-4">
                      <img
                        src={review.image}
                        alt="reviewavatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-[12px] leading-[100%] text-[#FFFFFFBF]">
                          {review.name}
                        </p>
                        <p className="font-normal text-[10px] leading-[100%] text-[#FFFFFF99]">
                          {review.occupation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimateFromInside>
      </div>
    </div>
  );
};

export default SuperTraders;
