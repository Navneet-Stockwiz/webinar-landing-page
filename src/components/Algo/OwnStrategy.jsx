import React from "react";
import desktop from "../../assets/svg/desktop.svg";
import discovered from "../../assets/svg/discovered.svg";
import net from "../../assets/webp/net.webp";
import ellipse1 from "../../assets/webp/ellipse1.webp";
import ellipse2 from "../../assets/webp/ellipse2.webp";
import ellipse3 from "../../assets/webp/ellipse3.webp";
import ellipse4 from "../../assets/webp/ellipse4.webp";
import x from "../../assets/webp/x.webp";
import featured from "../../assets/webp/featured.webp";
import GradientButton from "../../common/GradientButton";
import { AnimateFromInside } from "../../common/ScrollFadeIn";
import card5 from "../../assets/webp/card5.webp";
import card15 from "../../assets/webp/card15.webp";


const OwnStrategy = () => {
  return (
    <div className="bg-[#01041A] text-white flex flex-col gap-4 justify-center md:px-40 px-4 pb-16 items-center w-full h-auto">
      <AnimateFromInside>
        <p className="font-semibold md:text-[64px]  text-[40px] leading-[120%] text-white font-degular text-center">
          Build Your Own Strategy
        </p>
      </AnimateFromInside>
      <AnimateFromInside>
        <p className="font-normal md:text-[24px] text-[14px] md:leading-[33px] tracking-normal leading-[22px] text-center text-[#FFFFFFBF]/[0.75]">
          Apply your trading skills to build a winning strategy that dominates
          the market.
        </p>
      </AnimateFromInside>
      <div className="flex md:flex-row flex-col justify-center md:gap-24 items-center w-full md:mt-6  p-2">
        <AnimateFromInside>
          {/* Left Card */}
          <div className="flex flex-col items-start md:justify-between justify-center gap-4 md:w-[370px] w-[345px] rounded-t-[24px] md:rounded-[24px] border-dashed md:border-[2px] border-x-[2px] border-t-[2px] border-[#FFFFFF38]/[0.22] p-6 md:h-[555px] h-auto overflow-hidden">
            <div className="flex flex-col items-start justify-start gap-4">
              <img src={desktop} alt={desktop} className="md:w-auto w-[36px]" />
              <p className="font-semibold tracking-wide md:text-[31px] text-[24px] md:leading-[38px] leading-[32px] font-degular">
                Build High Performance
                <br />
                <span
                  className="font-semibold md:text-[31px] text-[24px] md:leading-[38px] leading-[32px] font-degular"
                  style={{
                    background:
                      "linear-gradient(95.84deg, #0058FF -12.34%, #FFFFFF 70.31%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                  }}
                >
                  Algo Strategies
                </span>
              </p>
              <p className="font-medium md:text-[18px]  text-[14px] md:leading-[26px] leading-[22px] tracking-normal text-[#FFFFFFBF]">
                Create your strategies across various segments such as equity,
                futures and options. You can customize time frames, entry / exit
                conditions, execution parameters and much more.
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <GradientButton />
            </div>
          </div>
        </AnimateFromInside>
        <AnimateFromInside>
          {/* Right Side: Two Cards */}
          <div className="bg-[#0F1330] flex flex-col gap-3 px-6 pb-6 pt-4 text-white font-sans md:h-[555px] h-auto md:w-[738px] w-[345px] relative md:rounded-[24px] rounded-b-[24px]">
            {/* First Row - Left aligned card */}
            <img
              src={card5}
              alt={card5}
              className="md:w-[60%] w-[70%] z-10"
            />
            <img
              src={card15}
              alt={card15}
              className="md:w-[60%] w-[70%] relative self-end z-10"
            />

            <img
              src={net}
              alt="net"
              className="absolute inset-0 h-[555px] object-contain pointer-events-none w-full"
            />
            <img
              src={ellipse1}
              alt="ellipse1"
              className="absolute object-cover left-0 bottom-0 opacity-60"
            />
            <img
              src={ellipse2}
              alt="ellipse2"
              className="absolute object-cover left-0 bottom-0 opacity-60 rounded-bl-[24px]"
            />
            <img
              src={ellipse3}
              alt="ellipse3"
              className="absolute object-cover right-0 top-0 opacity-50"
            />
            <img
              src={ellipse4}
              alt="ellipse4"
              className="absolute object-cover right-56 top-6 opacity-50"
            />
            <img
              src={x}
              alt="x"
              className="absolute object-cover right-0 top-0 md:rounded-tr-[24px] md:w-auto w-[30%]"
            />
          </div>
        </AnimateFromInside>
      </div>
      <div className="flex md:flex-row flex-col-reverse justify-center items-center md:gap-24  w-full md:mt-6 p-2">
        <AnimateFromInside>
          {/* left Side: Two Cards */}
          <div className="bg-[#0F1330] flex p-6 text-white md:h-[555px] h-auto md:w-[738px] w-[345px] relative md:rounded-[24px] rounded-b-[24px]">
            <div className="flex justify-center items-center">
              <img
                src={featured}
                alt={featured}
                className="z-10 object-cover"
              />
            </div>

            <img
              src={net}
              alt="net"
              className="absolute inset-0 h-full object-contain pointer-events-none w-full"
            />
            <img
              src={ellipse1}
              alt="ellipse1"
              className="absolute object-cover left-0 bottom-0 opacity-60"
            />
            <img
              src={ellipse2}
              alt="ellipse2"
              className="absolute object-cover left-0 bottom-0 opacity-60 rounded-bl-[24px]"
            />
            <img
              src={ellipse3}
              alt="ellipse3"
              className="absolute object-cover right-0 top-0 opacity-50"
            />
            <img
              src={ellipse4}
              alt="ellipse4"
              className="absolute object-cover right-56 top-6 opacity-50"
            />
          </div>
        </AnimateFromInside>
        <AnimateFromInside>
          {/* right Card */}
          <div className="flex flex-col items-start md:justify-between justify-center gap-4 md:w-[370px] w-[345px] rounded-t-[24px] md:rounded-[24px] border-dashed md:border-[2px] border-x-[2px] border-t-[2px] border-[#FFFFFF38]/[0.22] p-6 md:h-[555px] h-auto overflow-hidden">
            <div className="flex flex-col items-start justify-start gap-4">
              <img
                src={discovered}
                alt={discovered}
                className="md:w-auto w-[36px]"
              />
              <p className="font-semibold md:text-[31px] tracking-wide text-[24px] md:leading-[38px] leading-[32px] font-degular">
                <span
                  className="font-semibold md:text-[31px] text-[24px] md:leading-[38px] leading-[32px] font-degular"
                  style={{
                    background:
                      "linear-gradient(95.84deg, #0058FF -12.34%, #FFFFFF 70.31%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                  }}
                >
                  Backtest & Forward Test{" "}
                </span>
                Strategies Before Going Live
              </p>
              <p className="font-medium md:text-[18px] text-[14px] md:leading-[26px] leading-[22px] tracking-normal text-[#FFFFFFBF]">
                Test your strategies in the live markets using our forward test
                feature and backtest your strategy results using historical data
                of the last 7+ years. Tweak your strategy if required, before
                deploying it in the live markets.
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <GradientButton />
            </div>
          </div>
        </AnimateFromInside>
      </div>
    </div>
  );
};

export default OwnStrategy;
