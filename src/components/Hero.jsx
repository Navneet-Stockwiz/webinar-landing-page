import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import CTAButton from "../common/CTAButton";
import background from "../assets/webp/background.webp";
import video from "../assets/webp/video2.webp";
import staricon from "../assets/svg/staricon.svg";
import autopiloticon from "../assets/svg/autopiloticon.svg";
import autuomatictradingicon from "../assets/svg/autuomatictradingicon.svg";
import begineerfriendly from "../assets/svg/begineerfriendly.svg";
import nocodingrequired from "../assets/svg/nocodingrequired.svg";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex items-center justify-center text-white bg-[#010611] md:p-4 3xl:p-8"
    >
      <div
        className="flex flex-col lg:flex-row justify-center items-center w-full h-auto md:min-h-[830px] 3xl:min-h-[1000px] rounded-b-[24px] md:rounded-b-[48px] 3xl:rounded-b-[64px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Left Side - Text Content */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start 3xl:items-center gap-4 px-4 sm:px-6 md:px-8 lg:pl-40 3xl:pl-0 3xl:pr-0 md:gap-6 3xl:gap-8 w-full pt-24 lg:pt-8 3xl:pt-12">
          <AnimateFromInside>
            <div className="inline-flex items-center justify-center gap-2 bg-[#00000033]/[0.2] py-2 pl-2 pr-3 md:pr-4 3xl:pr-6 rounded-full border border-[#FFFFFF30]">
              <div
                className="p-[1px] rounded-full"
                style={{
                  background:
                    "linear-gradient(278.7deg, #000000 -4.15%, #FF3C3C 96.59%)",
                }}
              >
                <span
                  className="font-bold leading-[100%] flex items-center gap-1 md:gap-2 3xl:gap-3 text-white text-[14px] md:text-[18px] 3xl:text-[22px] px-2 md:px-4 3xl:px-6 py-1 md:py-2 3xl:py-3 rounded-full"
                  style={{
                    background:
                      "linear-gradient(101.35deg, #000000 1.29%, #FF3C3C 140.52%)",
                  }}
                >
                  <span className="h-2 w-2 md:h-3 md:w-3 3xl:h-4 3xl:w-4 rounded-full bg-[#F04141] animate-pulse inline-block"></span>
                  Live
                </span>
              </div>

              <p className="text-[12px] md:text-[18px] 3xl:text-[22px] leading-5 md:leading-6 3xl:leading-7 font-medium">
                90 Mins Webinar on A.I Powered Algo Trading
              </p>
            </div>
          </AnimateFromInside>

          <AnimateFromInside>
            <h1 className="font-normal text-[40px] sm:text-[36px] md:text-[56px] lg:text-[66px] xl:text-[76px] 3xl:text-[90px] leading-[41px] sm:leading-[42px] md:leading-[72px] 3xl:leading-[95px] text-center lg:text-left font-degular">
              Learn How To Trade
              <br />
              Using{" "}
              <img
                src={staricon}
                alt={staricon}
                className="object-cover w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-auto xl:h-auto 3xl:w-12 3xl:h-12 inline"
              />
              <span
                className="pl-1 bg-gradient-to-r from-[#007AFF] to-[#81F0FF] bg-clip-text text-transparent"
                style={{
                  background:
                    "linear-gradient(91.62deg, #007AFF -44.13%, #81F0FF 120.92%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI Powered
              </span>
              <br />
              Algo Trading Tools
            </h1>
          </AnimateFromInside>

          <AnimateFromInside>
            <p className="font-normal text-sm sm:text-[16px] md:text-[20px] 3xl:text-[24px] text-[#FFFFFF] text-center lg:text-left sm:leading-[22px] md:leading-[28px] 3xl:leading-[32px]">
              The age of AI is here, and professional traders are going all in.{" "}
              <br className="hidden sm:block" />{" "}
              <span className="sm:hidden">
                The biggest trading revolution is here.
              </span>
              <span className="hidden sm:inline">
                The biggest trading revolution is here.
              </span>
            </p>
          </AnimateFromInside>

          {/* Feature Cards */}
          <AnimateFromInside>
            <div className="w-full mt-2">
              {/* Mobile and Small Screens: 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden justify-items-center">
                <div className="flex items-center gap-2 rounded-[8px] p-2 border-[1.3px] border-[#FFFFFF33] bg-[#00000029] w-[160px]">
                  <img
                    src={autopiloticon}
                    alt={autopiloticon}
                    className="object-cover w-[35px] h-[35px]"
                  />
                  <span className="font-degular font-medium text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px]">
                    Trade On <br /> Autopilot
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] p-2 border-[1.3px] border-[#FFFFFF33] bg-[#00000029] w-[160px]">
                  <img
                    src={autuomatictradingicon}
                    alt={autuomatictradingicon}
                    className="object-cover w-[35px] h-[35px]"
                  />
                  <span className="font-degular font-medium text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px]">
                    Fully Automatic <br /> Trading
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] p-2 border-[1.3px] border-[#FFFFFF33] bg-[#00000029] w-[160px]">
                  <img
                    src={begineerfriendly}
                    alt={begineerfriendly}
                    className="object-cover w-[35px] h-[35px]"
                  />
                  <span className="font-degular font-medium text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px]">
                    Beginner <br />
                    Friendly
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] p-2 border-[1.3px] border-[#FFFFFF33] bg-[#00000029] w-[160px]">
                  <img
                    src={nocodingrequired}
                    alt={nocodingrequired}
                    className="object-cover w-[35px] h-[35px]"
                  />
                  <span className="font-degular font-medium text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px]">
                    No Coding <br />
                    Required
                  </span>
                </div>
              </div>

              {/* Large Screens: Horizontal Row */}
              <div className="hidden lg:flex items-start gap-6 3xl:gap-4 mt-2">
                <div className="flex items-center gap-4 3xl:gap-2 rounded-[8px] p-2 3xl:p-2 border-[1.3px] border-[#FFFFFF33] w-[230px] 3xl:w-[220px] bg-[#00000029]">
                  <img
                    src={autopiloticon}
                    alt={autopiloticon}
                    className="object-cover w-12 h-12 3xl:w-12 3xl:h-12"
                  />
                  <span className="font-degular font-medium text-[20px] 3xl:text-[20px] leading-[25px] 3xl:leading-[25px]">
                    Trade On <br /> Autopilot
                  </span>
                </div>
                <div className="flex items-center gap-4 3xl:gap-2 rounded-[8px] p-2 3xl:p-2 border-[1.3px] border-[#FFFFFF33] w-[230px] 3xl:w-[230px] bg-[#00000029]">
                  <img
                    src={autuomatictradingicon}
                    alt={autuomatictradingicon}
                    className="object-cover w-12 h-12 3xl:w-12 3xl:h-12"
                  />
                  <span className="font-degular font-medium text-[20px] 3xl:text-[20px] leading-[25px] 3xl:leading-[25px]">
                    Fully Automatic <br /> Trading
                  </span>
                </div>
                <div className="flex items-center gap-4 3xl:gap-2 rounded-[8px] p-2 3xl:p-2 border-[1.3px] border-[#FFFFFF33] w-[230px] 3xl:w-[220px] bg-[#00000029]">
                  <img
                    src={begineerfriendly}
                    alt={begineerfriendly}
                    className="object-cover w-12 h-12 3xl:w-12 3xl:h-12"
                  />
                  <span className="font-degular font-medium text-[20px] 3xl:text-[20px] leading-[25px] 3xl:leading-[25px]">
                    Beginner <br />
                    Friendly
                  </span>
                </div>
              </div>
              <AnimateFromInside>
                <div className="md:block hidden pt-4">
                  <CTAButton />
                </div>
              </AnimateFromInside>
            </div>
          </AnimateFromInside>
          <div className="md:hidden flex justify-center items-center w-full">
            <AnimateFromInside>
              <CTAButton />
            </AnimateFromInside>
          </div>
        </div>

        {/* Right Side - Video Image */}
        <div className="flex-1 flex justify-center lg:justify-end 3xl:justify-center items-center w-full lg:w-auto md:pb-0 pb-4 md:pt-0 pt-4 3xl:pt-16 3xl:pl-0 3xl:pr-0">
          <img
            src={video}
            alt="Video preview"
            className="object-cover w-full max-w-[355px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-none 3xl:max-w-[800px] relative lg:-right-16 3xl:relative 3xl:right-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
