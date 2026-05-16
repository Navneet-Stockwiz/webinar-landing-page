import React, { useRef, useEffect, useState } from "react";
import card11 from "../assets/webp/card11.webp";
import card12 from "../assets/webp/card12.webp";
import card13 from "../assets/webp/card13.webp";
import strykexwhite from "../assets/svg/strykexwhite.svg";
import algos from "../assets/svg/algos.svg";
import link from "../assets/svg/link.svg";
import deploy from "../assets/svg/deploy.svg";
import cardarrow from "../assets/svg/cardarrow.svg";
import arrow2 from "../assets/svg/arrow2.svg";
import arrow3 from "../assets/svg/arrow3.svg";
import arrow4 from "../assets/svg/arrow4.svg";
import arrow5 from "../assets/svg/arrow5.svg";
import blackarrow from "../assets/svg/blackarrow.svg";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import { usePaymentDialog } from "../hooks/PaymentDialogContext";

const dummyImages = [card11, card12, card13];

const leftContent = [
  {
    number: 1,
    icon: algos,
    title: "Sign Up For StrykeX Algos",
    description:
      "Select your subscription plan as per your requirements. We have two plan types, StrykeX Gold and StrykeX Legend. You can checkout our pricing here.",
  },
  {
    number: 2,
    icon: link,
    title: "Connect Your Trading Account",
    description:
      "Connect your demat account with StrykeX to activate your account. All your trades will automatically be executed from your own broker account. To open a StrykeX free demat account click here",
  },
  {
    number: 3,
    icon: deploy,
    title: "Deploy Algo Strategies in Live Markets",
    description:
      "Achieve lightning-fast execution with our proprietary trading engine—fully automated and equipped with customizable exit rules like trailing stop-loss, re-entry, partial profit booking, and advanced risk management.",
  },
];

const card = [
  {
    icon: arrow2,
    title: "Backtest Performance",
    description: "All algos come with detailed backtest reports.",
  },
  {
    icon: arrow3,
    title: "Fully Automatic Trading",
    description:
      "Effortlessly deploy your trading bots to trade in the markets for you on autopilot.",
  },
  {
    icon: arrow4,
    title: "Create Custom Strategies",
    description:
      "Explore the world of data driven trading using our vast suite of algo trading tools. Use price action, indicators, volume and time based techniques.",
  },
  {
    icon: arrow5,
    title: "Simplified Trading",
    description: "Discover, save and execute algos with just one click.",
  },
];

const Works = () => {
  const triggerRefs = [useRef(null), useRef(null), useRef(null)];
  const [activeStep, setActiveStep] = useState(0);
  const { openPaymentDialog } = usePaymentDialog();

  useEffect(() => {
    const observers = triggerRefs.map((ref, i) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i);
          }
        },
        {
          rootMargin: "-20% 0px -50% 0px",
          threshold: 0.3,
        }
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <div className="bg-[#01041A] text-white flex flex-col justify-center items-center gap-4 md:py-16 pb-0 md:px-40 px-4 w-full ">
      <AnimateFromInside>
        <p className="font-semibold md:text-[64px]  text-[40px] leading-[100%]  font-degular">
          How It Works?
        </p>
      </AnimateFromInside>
      <AnimateFromInside>
        <p className="md:text-[20px] sm:text-[18px] text-[14px] md:leading-[33px] leading-[22px] text-[#FFFFFFBF] max-w-4xl mx-auto mb-6">
          Get started with algo trading in three easy steps.
        </p>
      </AnimateFromInside>

      <div className="md:grid hidden grid-cols-[1fr_auto_1fr] gap-6 w-full relative min-h-[1450px]">
        {/* Left Side */}
        <div className="relative flex flex-col justify-between items-end pr-24">
          {leftContent.map((item, index) => (
            <div
              key={index}
              ref={triggerRefs[index]}
              className="max-w-[479px] w-full min-h-[300px] flex flex-col justify-start items-start gap-4"
            >
              <img src={item.icon} alt="" className="h-[43px]" />
              <p className="text-[40px] leading-[45px] font-semibold font-degular">
                {item.title}
              </p>
              <p className="font-light text-[20px] leading-[32px] text-[#FFFFFFBF]/[0.75]">
                {item.description}
              </p>
              <button
                onClick={openPaymentDialog}
                className="flex justify-between px-4 items-center gap-4 bg-white mt-2 text-black md:text-[20px] text-[16px] leading-[100%] font-semibold rounded-[12px] w-full py-3"
              >
                <span className="flex gap-2 justify-center items-center">
                  Subscribe To{" "}
                  <img
                    src={strykexwhite}
                    alt="strykexwhite"
                    className="h-[24px] object-cover"
                  />
                </span>
                <span>
                  <img src={blackarrow} alt={blackarrow} />
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Center Timeline */}
        <div className="flex flex-col items-center justify-between py-6 relative">
          <div className="border-[2px] border-dashed border-[#FFFFFF4D]/[0.3] absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full text-white font-bold flex items-center justify-center z-10 transition-all duration-300 my-[120px] ${
                activeStep === i ? "scale-110 shadow-lg" : "opacity-70"
              }`}
              style={{
                background: "linear-gradient(180deg, #01041A 0%, #1F4399 100%)",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Right Images */}
        <div className="flex flex-col justify-between items-start pl-24">
          {dummyImages.map((img, index) => (
            <div
              key={index}
              className="w-full max-w-[479px] min-h-[300px] flex items-center"
            >
              <img
                src={img}
                alt={`Step ${index + 1}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:hidden w-full gap-12">
        {leftContent.map((item, index) => (
          <AnimateFromInside key={index}>
            <div className="flex flex-col gap-4 items-center text-center">
              <img src={item.icon} alt="" className="h-[32px]" />
              <p className="text-[24px]  font-semibold leading-[100%]">
                {item.title}
              </p>
              <p className="font-light text-[14px] text-[#FFFFFFBF]/[0.75] leading-[22px]">
                {item.description}
              </p>
              <button
                onClick={openPaymentDialog}
                className="flex justify-between px-4 items-center gap-4 bg-white text-black md:text-[20px] text-[16px] font-semibold rounded-[12px] w-full py-2"
              >
                <span className="flex justify-center items-center gap-2">
                  Subscribe To{" "}
                  <img
                    src={strykexwhite}
                    alt="strykexwhite"
                    className="h-[18px] object-cover"
                  />{" "}
                </span>
                <img src={blackarrow} alt={blackarrow} />
              </button>
              <img
                src={dummyImages[index]}
                alt={`Step ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg mt-4"
              />
            </div>
          </AnimateFromInside>
        ))}
      </div>

      {/* Bottom Cards */}
      <div className="w-full md:mt-[104px] mt-[60px] flex flex-wrap justify-center md:gap-10 gap-[50px]">
        {card.map((item, index) => (
          <AnimateFromInside key={index}>
            <div className="flex flex-col md:justify-start justify-center md:items-start items-center md:gap-5 gap-0 md:w-[300px] w-full">
              <img src={item.icon} alt={item.icon} className="h-[72px]" />
              <p className="font-semibold md:text-[32px] text-[28px] md:leading-[42px] leading-[40px] md:text-start text-center font-degular mt-4">
                {item.title}
              </p>
              <p className="font-light text-[20px] leading-[32px] md:text-start text-center text-[#FFFFFFBF]">
                {item.description}
              </p>
            </div>
          </AnimateFromInside>
        ))}
      </div>
    </div>
  );
};

export default Works;
