import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import CTAButton from "../common/CTAButton";
import Header from "./Header.jsx";
import background from "../assets/webp/background.webp";
import heroVisual from "../assets/webp/hero.webp";
import heroMobile from "../assets/webp/heromobile.webp";
import staricon from "../assets/svg/staricon.svg";
import groupimg from "../assets/svg/groupimg.svg";
import timeicon from "../assets/svg/timeicon.svg";
import { useWebinar } from "../contexts/WebinarContext";
import { formatWebinarBatchDate } from "../utils/dateFormatter";

const STATS = [
  { value: "2L+", label: "Traders & Investors" },
  { value: "₹150 Cr+", label: "Assets Under Mgmt" },
  { value: "40+", label: "Pre Built Algo Robots" },
  { value: "10+ yrs", label: "Markets Experience" },
];

const HERO_CONTAINER =
  "w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 box-border";
const HERO_GAP = "gap-3 sm:gap-4 md:gap-5";
const HERO_ANIMATE_WRAP = "w-full flex flex-col items-center";

const Hero = () => {
  const { webinarData } = useWebinar();
  const batchDate = formatWebinarBatchDate(
    webinarData?.data?.strykex_free_english_date_time
  );

  return (
    <section
      id="home"
      className="w-full flex items-center justify-center text-white bg-[#010611] md:p-4 3xl:p-8"
    >
      <div
        className="relative flex flex-col w-full min-h-0 rounded-b-[24px] md:rounded-b-[48px] 3xl:rounded-b-[64px] bg-cover bg-center overflow-x-clip"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Header />

        <div className={`flex flex-col flex-1 w-full min-h-0 ${HERO_GAP}`}>
          {/* Top content */}
          <div
            className={`${HERO_CONTAINER} flex flex-col items-center shrink-0 z-10 text-center ${HERO_GAP} pt-3 sm:pt-4 md:pt-6`}
          >
            {/* Badges — stacked on mobile, row on md+ (attendees first per design) */}
            <AnimateFromInside className={HERO_ANIMATE_WRAP}>
              <div
                className={`flex flex-col items-center w-full ${HERO_GAP} md:flex-row md:flex-wrap md:justify-center`}
              >
                <div className="inline-flex items-center gap-2 bg-[#00000033] py-2 px-3 md:px-4 rounded-full border border-[#FFFFFF30] max-w-full">
                  <img
                    src={groupimg}
                    alt=""
                    className="h-6 md:h-7 w-auto object-contain shrink-0"
                    aria-hidden
                  />
                  <p className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide text-white/90 uppercase whitespace-nowrap">
                    1,00,000+ Attendees
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#00000033] py-2 pl-2 pr-3 md:pr-4 rounded-full border border-[#FFFFFF30] max-w-full">
                  <div
                    className="p-[1px] rounded-full shrink-0"
                    style={{
                      background:
                        "linear-gradient(278.7deg, #000000 -4.15%, #FF3C3C 96.59%)",
                    }}
                  >
                    <span
                      className="font-bold leading-none flex items-center gap-1.5 text-white text-[11px] md:text-[14px] px-2 md:px-3 py-1 rounded-full"
                      style={{
                        background:
                          "linear-gradient(101.35deg, #000000 1.29%, #FF3C3C 140.52%)",
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#F04141] animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] md:text-[13px] font-medium text-white/90 text-left">
                    90 Mins Webinar on A.I Powered Algo Trading
                  </p>
                </div>
              </div>
            </AnimateFromInside>

            <AnimateFromInside className={HERO_ANIMATE_WRAP}>
              <h1 className="w-full max-w-[340px] sm:max-w-none font-semibold text-[28px] sm:text-[34px] md:text-[56px] lg:text-[64px] leading-[1.12] font-degular">
                Learn How To Trade Using
                <br />
                <span className="inline-flex items-center justify-center gap-1.5">
                  <img
                    src={staricon}
                    alt=""
                    className="w-7 h-7 sm:w-8 sm:h-8 inline shrink-0"
                    aria-hidden
                  />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      background:
                        "linear-gradient(91.62deg, #007AFF -44.13%, #81F0FF 120.92%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    AI Powered
                  </span>
                </span>
                <br />
                Algo Trading Tools
              </h1>
            </AnimateFromInside>

            <AnimateFromInside className={HERO_ANIMATE_WRAP}>
              <p className="font-normal text-[13px] sm:text-sm md:text-base lg:text-lg text-[#FFFFFFBF] max-w-[320px] sm:max-w-md md:max-w-2xl mx-auto leading-relaxed text-center">
                The age of AI is here, and professional traders are going all in.
                The biggest trading revolution is here.
              </p>
            </AnimateFromInside>

            <AnimateFromInside className={HERO_ANIMATE_WRAP}>
              <div className="relative inline-flex flex-col items-center w-full max-w-[360px] sm:max-w-[400px]">
                <div className="relative z-20 w-full">
                  <CTAButton compact />
                </div>
                <span
                  className="relative z-10 -mt-[14px] md:-mt-[16px] inline-flex items-center justify-center px-4 md:px-6 pt-3 md:pt-4 pb-1.5 md:pb-2 rounded-t-none rounded-b-[12px] text-[11px] md:text-[12px] font-semibold text-white whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(91.44deg, #3F72FF -4.99%, #0036B2 52.99%, #47B4B4 112.17%)",
                    boxShadow: "0 6px 24px rgba(0, 122, 255, 0.35)",
                  }}
                >
                  + ₹25,499 Bonus Stack
                </span>
              </div>
            </AnimateFromInside>

            {/* Stats — 2×2 grid on all breakpoints */}
            <AnimateFromInside className={`${HERO_ANIMATE_WRAP} w-full`}>
              <div className="grid grid-cols-2 w-full max-w-[340px] sm:max-w-[400px] md:max-w-[520px] rounded-[12px] md:rounded-[14px] border border-white/10 bg-[#FFFFFF12] backdrop-blur-[12px] overflow-hidden">
                {STATS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col items-center justify-center gap-1 sm:gap-1.5 py-4 px-2 sm:py-5 sm:px-3 md:py-6 md:px-4
                      ${index % 2 === 0 ? "border-r border-white/10" : ""}
                      ${index < 2 ? "border-b border-white/10" : ""}`}
                  >
                    <p className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold leading-none whitespace-nowrap">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-[11px] md:text-[13px] font-medium text-[#FFFFFFBF] leading-snug text-center">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateFromInside>
          </div>

          {/* Bottom block: batch pills then dashboard image */}
          <div
            className={`relative z-10 w-full flex flex-col flex-1 items-center min-h-0 ${HERO_GAP} pb-0`}
          >
            <AnimateFromInside className={`${HERO_ANIMATE_WRAP} hidden sm:flex`}>
              <div
                className={`${HERO_CONTAINER} relative z-10 flex flex-wrap items-center justify-center ${HERO_GAP}`}
              >
                <span className="inline-flex items-center rounded-[7px] bg-[linear-gradient(170.51deg,#000000_-4.73%,#CD0000_234.56%)] px-2 py-0.5 text-[11px] md:text-[13px] font-medium text-white whitespace-nowrap">
                  Only <span className="text-[#ff6b6b] font-semibold mx-0.5">8 Seats</span> Left
                </span>
                <div className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#FFFFFF1A] backdrop-blur-[4px] px-2.5 py-1">
                  <img
                    src={timeicon}
                    alt=""
                    className="w-4 h-4 md:w-[18px] md:h-[18px] shrink-0 opacity-90"
                    aria-hidden
                  />
                  <p className="text-[11px] md:text-[13px] font-medium text-white/90 whitespace-nowrap">
                    Next batch:{" "}
                    <span className="text-white font-semibold">
                      {batchDate ?? "Mon, 20 Apr • 8:00 PM IST"}
                    </span>
                  </p>
                </div>
              </div>
            </AnimateFromInside>

            <div className="relative z-10 mt-2 sm:mt-4 md:mt-auto w-full flex flex-col items-center px-2 sm:px-4 md:px-6 pb-0 leading-none">
              <div className="relative z-10 w-full max-w-[min(100%,420px)] sm:max-w-[560px] md:max-w-[820px] lg:max-w-[1000px] xl:max-w-[1100px] mx-auto">
                <picture className="block w-full">
                  <source media="(min-width: 768px)" srcSet={heroVisual} />
                  <img
                    src={heroMobile}
                    alt="StrykeX AI powered algo trading dashboard"
                    className="w-full h-auto block mx-auto md:relative md:left-6 lg:left-10"
                    draggable={false}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
