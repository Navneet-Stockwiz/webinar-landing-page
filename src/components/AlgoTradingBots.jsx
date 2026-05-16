import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import CTAButton from "../common/CTAButton";

// Import trading bot images
import decayMinerImg from "../assets/webp/decay-miner.webp";
import trendRiderImg from "../assets/webp/trend-rider.webp";
import momentumSurgeImg from "../assets/webp/momentum-surge.webp";
import breakoutBlitzImg from "../assets/webp/breakout-blitz.webp";
import theBigBullImg from "../assets/webp/the-big-bull.webp";
import trendInverterImg from "../assets/webp/trend-inverter.webp";
import ellipsecard from "../assets/webp/ellipsecard.webp";

const AlgoTradingBots = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef(null);

  // Image mapping function
  const getBotImage = (title) => {
    const imageMap = {
      "Decay Miner": decayMinerImg,
      "Trend Rider": trendRiderImg,
      "Momentum Surge": momentumSurgeImg,
      "Breakout Blitz": breakoutBlitzImg,
      "The Big Bull": theBigBullImg,
      "Trend Inverter": trendInverterImg,
    };
    return imageMap[title] || decayMinerImg; // fallback to first image
  };

  // Define trading bots data first
  const tradingBots = [
    {
      id: 1,
      title: "Decay Miner",
      description: (
        <>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Automatically takes advantage of volatility
          </p>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Win rate of{" "}
            <span className="font-semibold text-[#4CFE7F]">85%+</span>, works in
            index options
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: "Trend Rider",
      description: (
        <>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Automatically detects big trends and rides them
          </p>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Win rate of{" "}
            <span className="font-semibold text-[#4CFE7F]">70%+</span>, works in
            all F&O stocks
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: "Momentum Surge",
      description: (
        <>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Automatically scans institutional activity and executes trades
          </p>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            -{" "}
            <span className="font-semibold text-white">
              {" "}
              Especially designed for Nifty{" "}
            </span>
            & Bank Nifty Index Options
          </p>
        </>
      ),
    },
    {
      id: 4,
      title: "Breakout Blitz",
      description: (
        <>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Pre built breakout trading bot, captures big sudden moves
          </p>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Curated for index futures such as{" "}
            <span className="font-semibold text-white">
              Midcap Nifty & Fin Nifty
            </span>
          </p>
        </>
      ),
    },
    {
      id: 5,
      title: "The Big Bull",
      description: (
        <>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            -{" "}
            <span className="font-semibold text-white">
              Fundamental analyst + professional technical trading bot
            </span>
          </p>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Spots undervalued stocks, buys low, sells high & repeat
          </p>
        </>
      ),
    },
    {
      id: 6,
      title: "Trend Inverter",
      description: (
        <>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            - Contra trading bot - designed to take reversal trades
          </p>
          <p className="text-[#FFFFFFBF] text-[12px] md:text-[18px] leading-[18px] md:leading-[26px] font-normal">
            -{" "}
            <span className="font-semibold text-white">
              Works in all market segments
            </span>{" "}
            - intraday and swing
          </p>
        </>
      ),
    },
  ];

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

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    controls.stop();

    const slideWidth = 356; // card width (340) + gap (16)
    const targetX = -index * slideWidth;

    controls.start({
      x: targetX,
      transition: { duration: 0.8, ease: "easeInOut" },
    });

    setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  // Autoplay functionality with Framer Motion
  useEffect(() => {
    if (!isPaused) {
      const cardWidth = 356;
      const totalWidth = tradingBots.length * cardWidth;

      const startAutoPlay = async () => {
        await controls.set({ x: 0 });

        controls.start({
          x: -totalWidth,
          transition: {
            duration: 20,
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
  }, [isPaused, controls, tradingBots.length]);

  const Card = ({ bot, isMobile = false }) => (
    <div
      className={`relative flex flex-col justify-start items-start bg-[#FFFFFF0D] border border-[#1C2230] rounded-[11.8px] p-3 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 ${
        isMobile ? "w-[340px] h-[320px]" : "flex-1"
      }`}
    >
      {/* Image Section */}
      <div className="relative w-full rounded-[12px] mb-3 md:mb-4 overflow-hidden">
        <img
          src={getBotImage(bot.title)}
          alt={bot.title}
          className="w-full h-auto"
        />
      </div>

      {/* Title */}
      <h3 className="font-degular text-[20px] md:text-[32px] leading-[100%] font-semibold text-white mb-3 md:mb-4 text-left">
        {bot.title}
      </h3>

      {/* Description */}
      <div className="flex flex-col gap-1 md:gap-2 text-left">
        {bot.description}
      </div>
      <img
        src={ellipsecard}
        alt="ellipsecard"
        className="absolute bottom-0 left-0 max-h-[400px] object-cover"
      />
    </div>
  );

  return (
    <div className="bg-[#010611] text-white flex flex-col md:gap-6 gap-4 justify-center md:px-80 3xl:px-[450px] px-4 pt-20 md:pb-8 w-full">
      {/* Heading */}
      <AnimateFromInside>
        <p className="font-semibold md:text-[64px] text-[32px] md:leading-[72px] leading-[36px] font-degular text-center">
          Winning Pre Built Algo Trading Bots{" "}
          <span className="text-[#FFFFFF99] font-normal">
            <br className="hidden md:block" /> – Exclusive Showcase
          </span>
        </p>
      </AnimateFromInside>
      <AnimateFromInside>
        <p className="font-normal md:text-[20px] text-[14px] md:leading-[26px] leading-[18px] text-[#C8D0E2] text-center">
          Get ready to blow your minds when we reveal our{" "}
          <br className="block md:hidden" /> fully automated, ready to use – pre
          built algo <br /> trading strategies which will put your wealth
          creation journey on autopilot.
        </p>
      </AnimateFromInside>

      {/* Cards Grid */}
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Desktop Layout - 2 rows of 3 cards each */}
        <div className="hidden md:flex flex-col gap-6 md:gap-8">
          {/* Row 1 */}
          <AnimateFromInside>
            <div className="flex gap-6 md:gap-8 justify-center">
              {tradingBots.slice(0, 3).map((bot) => (
                <Card key={bot.id} bot={bot} />
              ))}
            </div>
          </AnimateFromInside>

          {/* Row 2 */}
          <AnimateFromInside>
            <div className="flex gap-6 md:gap-8 justify-center">
              {tradingBots.slice(3, 6).map((bot) => (
                <Card key={bot.id} bot={bot} />
              ))}
            </div>
          </AnimateFromInside>
        </div>

        {/* Mobile Layout - Framer Motion carousel */}
        <div
          className="md:hidden overflow-hidden w-screen -mx-4"
          ref={containerRef}
        >
          <AnimateFromInside>
            <motion.div
              className="flex items-center gap-4 h-auto px-4"
              animate={controls}
              drag="x"
              dragConstraints={{ left: -tradingBots.length * 356, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleTouchStart}
              onDragEnd={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ x: 0 }}
              whileTap={{ scale: 0.995 }}
            >
              {/* First set of cards */}
              {tradingBots.map((bot) => (
                <motion.div
                  key={bot.id}
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bot={bot} isMobile={true} />
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {tradingBots.map((bot) => (
                <motion.div
                  key={`duplicate-${bot.id}`}
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bot={bot} isMobile={true} />
                </motion.div>
              ))}
            </motion.div>
          </AnimateFromInside>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <AnimateFromInside>
          <div className="md:flex hidden justify-center">
            <CTAButton />
          </div>
        </AnimateFromInside>
      </div>
    </div>
  );
};

export default AlgoTradingBots;
