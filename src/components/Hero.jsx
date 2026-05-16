import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import { motion, AnimatePresence } from "framer-motion";
import light from "../assets/webp/light.webp";
import light1 from "../assets/webp/light1.webp";
import video from "../assets/webp/video2.webp";
import a from "../assets/svg/9.svg";
import b from "../assets/svg/10.svg";
import c from "../assets/svg/11.svg";
import d from "../assets/svg/12.svg";
import e from "../assets/svg/13.svg";
import f from "../assets/svg/14.svg";
import g from "../assets/svg/15.svg";
import h from "../assets/svg/16.svg";
import i from "../assets/svg/17.svg";
import j from "../assets/svg/18.svg";
import k from "../assets/svg/19.svg";
import l from "../assets/svg/20.svg";
import m from "../assets/svg/21.svg";
import n from "../assets/svg/22.svg";
import o from "../assets/svg/23.svg";
import p from "../assets/svg/24.svg";
import sebiLogo from "../assets/svg/sebi.svg";
import leftcard1 from "../assets/webp/leftcard1.webp";
import rightcard1 from "../assets/webp/rightcard1.webp";
import TradingStatsCard from "./TradingStatsCard";
import { usePaymentDialog } from "../hooks/PaymentDialogContext";

const Hero = () => {
  const { openPaymentDialog } = usePaymentDialog();
  const logos = [
    { icon: a, name: "a" },
    { icon: b, name: "b" },
    { icon: c, name: "c" },
    { icon: p, name: "p" },
    { icon: d, name: "d" },
    { icon: e, name: "e" },
    { icon: f, name: "f" },
    { icon: g, name: "g" },
    { icon: h, name: "h" },
    { icon: i, name: "i" },
    { icon: j, name: "j" },
    { icon: k, name: "k" },
    { icon: l, name: "l" },
    { icon: m, name: "m" },
    { icon: n, name: "n" },
    { icon: o, name: "o" },
  ];

  const logos1 = [...logos, ...logos, ...logos];

  const rotatingWords = ["Create", "Deploy", "Test", "Automate", "Build"];
  const [index, setIndex] = React.useState(0);
  const word = rotatingWords[index];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center justify-center text-white bg-[#01041A] text-center px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 pb-12 pt-28 sm:pt-32 lg:pt-40 gap-4 overflow-hidden"
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
          className="w-full md:hidden  md:h-full h-[85%] object-cover object-center mix-blend-screen z-0"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col justify-center items-center gap-4">
          <AnimateFromInside>
            <div className="inline-flex items-center justify-center gap-2 bg-[#00000033]/[0.2] py-2 pl-2 pr-4 rounded-full">
              <span
                className="text-white text-[15px] leading-[100%] px-[10px] py-[6px] rounded-full font-bold"
                style={{
                  background:
                    "linear-gradient(95.55deg, #3FADFF -32.6%, #336CDC 57.15%, #47B4B4 148.75%)",
                }}
              >
                StrykeX
              </span>

              <p className="font-bold text-[15px] leading-6">
                AI{" "}
                <span className="font-normal">Based Algo Trading Platform</span>
              </p>
            </div>
          </AnimateFromInside>
          <AnimateFromInside>
            <div className="flex justify-center items-center flex-col">
              <p className="font-semibold text-[32.61px] tracking-wide  md:text-[48px] lg:text-[64px] leading-[120%] text-center sm:text-left font-degular">
                Welcome To The <br className="md:hidden block" />
                Future Of Trading
              </p>
              <div className="font-semibold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] leading-[120%] text-center sm:text-left">
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-2 font-degular">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={word}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="mr-1 inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent"
                    >
                      {word}
                      {"  "}
                    </motion.span>
                  </AnimatePresence>

                  <span className="inline-block">Strategies On Autopilot</span>
                </div>
              </div>
            </div>
          </AnimateFromInside>

          <AnimateFromInside>
            <p className="font-medium text-[14px] md:text-[22px] md:leading-[33px] leading-[22px] text-[#FFFFFFBF] tracking-normal">
              Unleash the power of fully automatic systematic trading, to change
              your trading <br className="hidden sm:block" />
              game forever.
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
              <p className="font-normal text-[13.27px]  tracking-normal md:text-[16px] md:leading-5 leading-[16.59px] bg-[#18181B] rounded-full px-3 sm:px-4 py-2 sm:py-2">
                <span className="text-[#EAB308] font-sans">★★★★</span> Trusted
                By 25,000+ Traders
              </p>
              <button
                onClick={openPaymentDialog}
                className="bg-white text-black text-[16px]  md:text-lg font-semibold rounded-full leading-[100%] py-4 px-6"
              >
                Get Started
              </button>
            </div>
          </div>
        </AnimateFromInside>
      </div>

      {/* Trusted by Text */}
      <p className="text-[#FFFFFF80]/[0.5] font-normal tracking-tight md:text-[20px] text-[12px]  md:leading-[30px] leading-[25px] w-full z-20">
        Trusted by <span className="font-bold">Professionals</span> Working At
        Top Companies Like
      </p>

      {/* Logo Marquee */}
      <div className="relative overflow-hidden md:mt-6 group z-20 w-screen bg-[#01041A]">
        {/* LEFT FADE */}
        <div
          className="pointer-events-none absolute md:block hidden top-0 left-0 h-full w-96 z-30"
          style={{
            background:
              "linear-gradient(to right, #01041A 0%, rgba(1, 4, 26, 0) 100%)",
          }}
        />

        {/* RIGHT FADE */}
        <div
          className="pointer-events-none absolute md:block  hidden top-0 right-0 h-full w-96 z-30"
          style={{
            background:
              "linear-gradient(to left, #01041A 0%, rgba(1, 4, 26, 0) 100%)",
          }}
        />

        {/* MARQUEE CONTENT */}
        <div className="flex items-center gap-20 h-[62px] md:animate-marquee animate-marquee1 group-hover:[animation-play-state:paused]">
          {logos1.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center shrink-0"
            >
              <img src={logo.icon} alt={logo.name} className="object-cover" />
            </div>
          ))}
        </div>
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
