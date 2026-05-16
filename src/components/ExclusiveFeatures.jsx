import React from "react";
import fill from "../assets/webp/fill.webp";
import fill1 from "../assets/webp/fill1.webp";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import card1 from "../assets/webp/card1.webp";
import card2 from "../assets/webp/card2.webp";
import card3 from "../assets/webp/card3.webp";
import card4 from "../assets/webp/card4.webp";
import card6 from "../assets/webp/card6.webp";
import card5 from "../assets/webp/card5.webp";
import card17 from "../assets/webp/card17.webp";
import card18 from "../assets/webp/card18.webp";
import strykexwhite from "../assets/svg/strykexwhite.svg";
import cnbcdark from "../assets/svg/2.svg";
import hindustandark from "../assets/svg/3.svg";
import moneycontrol from "../assets/svg/4.svg";
import tedx from "../assets/svg/5.svg";
import theprint from "../assets/svg/6.svg";
import seven from "../assets/svg/7.svg";
import eight from "../assets/svg/8.svg";
import ellipse6 from "../assets/webp/ellipse6.webp";
import { usePaymentDialog } from "../hooks/PaymentDialogContext";

const ExclusiveFeatures = () => {
  const logos = [
    { icon: cnbcdark, name: "cnbc" },
    { icon: tedx, name: "tedx" },
    { icon: hindustandark, name: "hindustan" },
    { icon: moneycontrol, name: "moneycontrol" },
    { icon: tedx, name: "tedx" },
    { icon: theprint, name: "theprint" },
    { icon: seven, name: "seven" },
    { icon: eight, name: "eight" },
  ];

  const { openPaymentDialog } = usePaymentDialog();

  const logos1 = [...logos, ...logos, ...logos];

  return (
    <div className="bg-[#01041A] text-white flex flex-col items-center md:px-40  pb-16 gap-4 w-full">
      <div className="relative w-full">
        {/* Text over the image */}
        <div className="absolute top-10 left-0 w-full h-full flex flex-col gap-4 items-center justify-center text-center">
          <AnimateFromInside>
            <h2 className="font-semibold md:text-[64px] text-[40px] leading-[100%] font-degular md:px-0 px-4">
              Exclusive Features
            </h2>
          </AnimateFromInside>
          <AnimateFromInside>
            <p className="font-normal md:text-[20px]  text-[14px] md:leading-[33px] tracking-normal leading-[22px] text-[#FFFFFFBF]/[0.75] md:px-0 px-4 font-sans">
              Unleash the power of artificial intelligence, data backed trading
              strategies and <br className="md:block hidden" /> lightning fast
              executions to level up your trading game.
            </p>
          </AnimateFromInside>
        </div>

        {/* Image */}
        <img
          src={fill}
          alt="Exclusive Background"
          className="md:block hidden object-cover -z-10"
        />
        <img
          src={fill1}
          alt="Exclusive Background"
          className="object-cover -z-10 md:hidden block w-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-6 md:px-0 px-4 w-full">
        <div className="flex md:flex-row flex-col gap-6 items-center justify-center">
          <AnimateFromInside>
            <div className="relative flex flex-col p-6 justify-between items-start gap-4 bg-[#FFFFFF0D]/[0.05] md:w-[405px] w-[345px] md:h-[411px] h-auto  rounded-[14px]">
              <img src={card1} alt="card1" className="object-cover" />
              <div className="flex flex-col md:gap-4 gap-0 justify-start items-start z-10">
                <p className="font-semibold md:text-[36px] text-[20px] md:leading-[52px] leading-[44px] text-white font-degular">
                  Backtesting
                </p>

                <p className="font-light md:text-[19px] text-[16px] md:leading-[26px] tracking-normal leading-[24px] text-[#FFFFFFBF]">
                  Backtest your strategies across all market segments with 7+
                  years of data. Test your strategy before live trading.
                </p>
              </div>
              <img
                src={ellipse6}
                alt={ellipse6}
                className="absolute bottom-0 left-0 rounded-bl-[14px] z-0"
              />
            </div>
          </AnimateFromInside>
          <AnimateFromInside>
            <div className="relative flex flex-col p-6 justify-between items-start gap-4 bg-[#FFFFFF0D]/[0.05] md:w-[405px] w-[345px] md:h-[411px] h-auto rounded-[14px]">
              <img src={card2} alt="card2" className="object-cover" />
              <div className="flex flex-col md:gap-4 gap-0 justify-start items-start z-10">
                <p className="font-semibold md:text-[36px] text-[20px] md:leading-[52px] leading-[44px] text-white font-degular">
                  Paper Trading
                </p>

                <p className="font-light md:text-[19px] text-[16px] md:leading-[26px] leading-[24px] tracking-normal  text-[#FFFFFFBF]">
                  Test strategies in live markets with{" "}
                  <br className="md:block hidden" /> virtual capital. Evaluate
                  performance
                  <br /> before going live.
                </p>
              </div>
              <img
                src={ellipse6}
                alt={ellipse6}
                className="absolute bottom-0 left-0 rounded-bl-[14px] z-0"
              />
            </div>
          </AnimateFromInside>
          <AnimateFromInside>
            <div className="relative flex flex-col p-6 justify-between items-start gap-4 bg-[#FFFFFF0D]/[0.05] md:w-[405px] w-[345px] md:h-[411px] h-auto rounded-[14px]">
              <img src={card3} alt="card3" className="object-cover" />
              <div className="flex flex-col md:gap-4 gap-0 justify-start items-start z-10">
                <p className="font-semibold md:text-[36px] text-[20px] md:leading-[52px] leading-[44px] text-white font-degular">
                  Forward Testing
                </p>

                <p className="font-light md:text-[19px] text-[16px] md:leading-[26px] leading-[24px] tracking-normal  text-[#FFFFFFBF]">
                  Deploy fully automated algo strategies in real time. Build
                  your trading edge with emotionless trading.
                </p>
              </div>
              <img
                src={ellipse6}
                alt={ellipse6}
                className="absolute bottom-0 left-0 rounded-bl-[14px] z-0"
              />
            </div>
          </AnimateFromInside>
        </div>
        <div className="flex md:flex-row flex-col gap-6 items-center justify-center">
          <AnimateFromInside>
            <div className="relative flex flex-col p-6 justify-between items-start gap-4 bg-[#FFFFFF0D]/[0.05] md:w-[405px] w-[345px] md:h-[411px] h-auto rounded-[14px]">
              <img src={card4} alt="card4" className="object-cover" />
              <div className="flex flex-col md:gap-4 gap-0 justify-start items-start z-10">
                <p className="font-semibold md:text-[35px] text-[20px] md:leading-[52px] leading-[44px] text-white font-degular">
                  Build Your Strategies
                </p>

                <p className="font-light md:text-[19px] text-[16px] md:leading-[26px] leading-[24px] tracking-normal  text-[#FFFFFFBF]">
                  Build your own algo strategies with 500+ unique
                  parameters—price, volume, indicators & more.
                </p>
              </div>
              <img
                src={ellipse6}
                alt={ellipse6}
                className="absolute bottom-0 left-0 rounded-bl-[14px] z-0"
              />
            </div>
          </AnimateFromInside>
          <AnimateFromInside>
            <div className="relative flex flex-col p-6 justify-between items-start gap-4 bg-[#FFFFFF0D]/[0.05] md:w-[824px] w-[345px] md:h-[411px] h-auto rounded-[14px]">
              <div className="flex justify-center items-center gap-4">
                <img
                  src={card5}
                  alt={card5}
                  className="md:w-[40%] w-[70%] z-10"
                />
                <img
                  src={card6}
                  alt="card6"
                  className="md:block hidden object-cover md:w-[60%] w-[50%]"
                />
                <div className="md:hidden flex flex-col justify-center gap-4 w-full">
                  <img src={card17} alt="card6" className="object-contain" />
                  <img src={card18} alt="card6" className="object-contain" />
                </div>
              </div>
              <div className="flex flex-col md:gap-4 gap-0 justify-start items-start z-10">
                <p className="font-semibold md:text-[36px] text-[20px] md:leading-[52px] leading-[44px] text-white font-degular">
                  Pre Made Algo Strategies
                </p>

                <p className="font-light md:text-[19px] text-[16px] md:leading-[26px] leading-[24px] tracking-normal  text-[#FFFFFFBF]">
                  Explore a comprehensive set of pre curated algorithmic trading
                  strategies based <br className="md:block hidden" /> on
                  momentum, mean reversion and trap trading
                  <br className="md:block hidden" />
                  techniques, built for peak trading performance.
                </p>
              </div>
              <img
                src={ellipse6}
                alt={ellipse6}
                className="absolute bottom-0 left-0 rounded-bl-[14px] z-0"
              />
            </div>
          </AnimateFromInside>
        </div>
        <AnimateFromInside>
          <button
            onClick={openPaymentDialog}
            className="flex justify-center tracking-normal items-center gap-2 bg-white md:mt-[24px] text-black text-[18px] leading-[100%] font-semibold rounded-full md:px-12 px-10 py-4 md:w-auto w-[345px]"
          >
            Subscribe To{" "}
            <span>
              <img
                src={strykexwhite}
                alt={strykexwhite}
                className="md:h-auto h-[21px]"
              />
            </span>
          </button>
        </AnimateFromInside>

        <div
          className="flex flex-col md:gap-5 gap-2 justify-center items-center w-screen md:mt-[104px] mt-[48px] md:py-5 py-2"
          style={{
            background:
              "linear-gradient(91.25deg, rgba(63, 173, 255, 0.14) 10.6%, rgba(51, 108, 220, 0.14) 50.75%, rgba(71, 180, 180, 0.14) 91.72%)",
          }}
        >
          <AnimateFromInside>
            <div className="font-semibold text-[24px]">
              <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
                Featured
              </span>{" "}
              In
            </div>
          </AnimateFromInside>
          <div className="overflow-hidden  group z-20 w-screen">
            <div className="flex items-center gap-9 h-auto md:animate-marquee animate-marquee1 group-hover:[animation-play-state:paused]">
              {logos1.map((logo, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center shrink-0"
                >
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveFeatures;
