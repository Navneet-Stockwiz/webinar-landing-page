import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import light from "../../assets/webp/light.webp";
import light1 from "../../assets/webp/light1.webp";
import video from "../../assets/webp/video2.webp";
import sebiLogo from "../../assets/svg/sebi.svg";
import leftcard1 from "../../assets/webp/leftcard1.webp";
import rightcard1 from "../../assets/webp/rightcard1.webp";
import { AnimateFromInside } from "../../common/ScrollFadeIn";
import TradingStatsCard from "../TradingStatsCard";
import { usePaymentDialog } from "../../hooks/PaymentDialogContext";

const Hero = () => {
  const { openPaymentDialog } = usePaymentDialog();
  const handleRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.stockwiz.app&hl=en_IN";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href =
        "https://apps.apple.com/us/app/stryke-by-stockwiz/id6503248719";
    } else {
      alert("Please visit from an iOS or Android device to download the app.");
    }
  };

  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center justify-center text-white bg-[#01041A] text-center px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 pb-16 pt-28 sm:pt-32 lg:pt-40 gap-4 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute top-0 w-full h-full z-0">
        <img
          src={light}
          alt=""
          className="w-full md:block hidden md:h-full h-[85%] object-cover object-center mix-blend-screen z-0"
        />
        <img
          src={light1}
          alt=""
          className="w-full md:hidden  h-full object-cover object-center mix-blend-screen z-0"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col justify-center items-center gap-4">
          <AnimateFromInside>
            <div className="flex justify-center items-center flex-col text-center font-degular">
              <p className="font-semibold text-[32.61px] tracking-wide md:text-[64px]  leading-[120%]">
                Unleash The Power of AI <br /> With
                Our <br className="md:hidden block" />
                <span className="bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
                  Pre Built Algos
                </span>
              </p>
            </div>
          </AnimateFromInside>

          <AnimateFromInside>
            <p className="font-medium text-[14px] sm:text-lg md:text-[22px] md:leading-[33px] leading-[22px] text-[#FFFFFFBF]/[0.75] tracking-normal">
              Explore our fully automated algorithmic trading strategies
              designed to capture major <br className="md:block hidden"/> market moves
            </p>
          </AnimateFromInside>
        </div>

        {/* Dashboard Preview */}
        <AnimateFromInside>
          <div className="relative mx-auto mt-6 max-w-4xl">
            <div className="aspect-[16/10] overflow-hidden rounded-xl relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 50.07%, #01041A 95.16%)",
                }}
              />
              <img
                src={video}
                alt="Video preview"
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 w-full text-center relative md:bottom-20 bottom-4">
              <button
                    onClick={openPaymentDialog}     
                className="bg-white text-black text-sm sm:text-base md:text-lg font-semibold rounded-full px-4 sm:px-6 py-2 sm:py-3"
              >
                Get Started
              </button>
            </div>
          </div>
        </AnimateFromInside>
      </div>
      <TradingStatsCard
        sebiLogo={sebiLogo}
        leftcard={leftcard1}
        rightcard={rightcard1}
      />
    </section>
  );
};

export default Hero;
