import React, { useState } from "react";
import light3 from "../assets/webp/light3.webp";
import light3mobile from "../assets/webp/light4mobile.webp";
import hoverx from "../assets/svg/hoverx.svg";
import verified1 from "../assets/svg/verified4.svg";
import lunchoffer from "../assets/svg/lunchoffer.svg";
import fileicon from "../assets/svg/fileicon.svg";
import light from "../assets/webp/light.webp";
import lunch from "../assets/webp/lunch.webp";
import fifteen from "../assets/webp/fifteen.webp";
import pricelightmobile from "../assets/webp/pricelightmobile.webp";
import vector from "../assets/webp/vector.webp";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import { useLocation } from "react-router-dom";
import StrykexPaymentDialog from "./StrykexPaymentDialog";
import { usePaymentDialog } from "../hooks/PaymentDialogContext";

const Pricing = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { openPaymentDialog } = usePaymentDialog();

  const { pathname } = useLocation();

  const paymentGateway = [
    {
      paymentName: "No Cost EMI Available",
      paymentDescription: "On credit cards",
    },
    {
      paymentName: "UPI EMI Available",
      paymentDescription: "Pay via GPay, PhonePe, Paytm",
    },
  ];

  return (
    <div
      className={`bg-[#01041A] text-white flex flex-col justify-center items-center md:gap-4 md:pb-16 pb-16 w-full relative overflow-hidden z-10 md:px-40 px-4 ${
        pathname === "/pricing" ? "pt-32 md:pt-[120px]" : "pt-12 md:pt-0"
      }`}
    >
      {/* Background Images */}
      <img
        src={light3}
        alt="Background Light"
        className="absolute md:block hidden bottom-0 left-0 w-full h-full object-fill -z-10"
      />
      <img
        src={light3mobile}
        alt="Background Light"
        className="absolute md:hidden h-full object-cover -z-10"
      />
      {pathname === "/pricing" && (
        <>
          <img
            src={light}
            alt="Background Light"
            className="absolute md:block hidden object-center -top-0 h-full w-full -z-20"
          />
          <img
            src={pricelightmobile}
            alt="Mobile Light"
            className="absolute md:hidden block object-cover -top-0 -z-30 h-[450px] w-full scale-x-150"
          />
          <img
            src={vector}
            alt="Vector"
            className="absolute md:hidden block object-cover top-16 -z-30 w-full opacity-50"
          />
        </>
      )}

      {/* Heading */}
      <div className="flex flex-col justify-center items-center gap-4 md:pt-16">
        <AnimateFromInside>
          <p className="font-semibold text-[48px] md:text-[64px] leading-[100%] tracking-normal font-degular z-50">
            Our <span className="">Pricing</span>
          </p>
        </AnimateFromInside>
      </div>

      {/* Pricing Card */}
      <div className="flex flex-col justify-center items-center w-full md:mt-6 mt-10 z-10">
        <AnimateFromInside>
          <div
            className="relative w-full md:w-[902px] h-auto rounded-[27px] md:rounded-[32px] md:px-8 md:pb-8 md:pt-10 p-4 flex flex-col md:gap-5 gap-4 text-left transition-all duration-500 group"
            style={{
              background:
                "linear-gradient(115.74deg, rgba(0, 0, 0, 0.58) 16.14%, rgba(24, 74, 190, 0.58) 96.07%)",
              border: "3px solid #FFFFFF38",
              backdropFilter: "blur(17.899999618530273px)",
              WebkitBackdropFilter: "blur(17.899999618530273px)",
              boxShadow: "20px -15px 86.1px 0px #FFFFFF40",
            }}
          >
            <div className="absolute -top-[14px] md:-top-6 -right-2">
              <div className="relative">
                <img
                  src={lunch}
                  alt="lunch"
                  className="object-cover md:w-[273px] w-[160px]"
                />
                <div className="absolute md:top-[6px] top-[2px] md:left-10 left-8 flex items-center gap-2">
                  <img
                    src={lunchoffer}
                    alt="launch offer icon"
                    className="w-4 md:w-8 md:h-8 h-4 object-contain"
                  />
                  <p className="text-white md:text-[24px] text-sm font-semibold">
                    Special Offer
                  </p>
                </div>
              </div>
            </div>
            <img
              src={hoverx}
              alt="Hover Effect"
              className="absolute top-0 right-0 object-cover h-auto"
            />

            {/* Title & Price */}
            <div className="flex justify-between md:flex-row flex-col">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold md:text-[32px] text-[24px] leading-[100%]">
                  <span className="bg-gradient-to-l from-[#457DFF] to-[#FFFFFF] bg-clip-text text-transparent">
                    Yearly Plan
                  </span>{" "}
                </h2>
                <p className="md:text-[16px] text-[10px] font-normal md:leading-[144%] leading-[160%] text-[#FFFFFFCC]">
                  Designed for serious traders and investors who want{" "}
                  <br className="md:hidden" /> to{" "}
                  <br className="md:block hidden" /> become full-time traders.
                </p>
              </div>
              <div className="flex flex-col md:items-end items-start gap-2">
                <span className="font-inter text-[26px] leading-[100%] md:text-[44px] font-bold text-white">
                  ₹6,499{""}
                  <span className="font-medium text-[28px] leading-[100%] text-[#FFFFFFBF]">
                    /month
                  </span>
                </span>
                <span className="md:text-[19px] text-[16px] font-inter leading-[144%] text-[#FFFFFFCC]">
                  ₹79,999/Year (Billed Annually)
                </span>
              </div>
            </div>

            {/* Features */}
            <p className="font-semibold text-[12.3px] md:text-[24px] md:mt-2">
              Includes :
            </p>
            <div className="flex md:flex-row flex-col justify-between w-full md:gap-20 gap-2">
              <div className="flex flex-1 flex-col justify-start md:gap-0 gap-2">
                {[
                  "Fully Automatic Trading",
                  "Custom Strategy Builder",
                  "Backtest Terminal",
                  "Equity, Futures & Options Segment",
                  "10 x Live Algo Deployments",
                  "100+ Indicators",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex justify-start font-bold md:text-[16px] text-[14px] items-center gap-4 md:leading-[23px] leading-[15.2px]"
                  >
                    <img
                      src={verified1}
                      alt="check"
                      className="object-cover md:h-[44px] h-[30px]"
                    />
                    {text}
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col justify-start md:gap-0 gap-2">
                {[
                  "30+ Pre Built Algo Strategies",
                  "Advanced Algo Trading Course",
                  "Options Wizard",
                  "Virtual Trading Simulator",
                  "Unlimited Backtest Credits",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex justify-start font-bold md:text-[16px] text-[14px] items-center gap-4 md:leading-[23px] leading-[15.2px]"
                  >
                    <img
                      src={verified1}
                      alt="check"
                      className="object-cover md:h-[44px] h-[30px]"
                    />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col flex-col-reverse md:gap-4 gap-3">
              {/* Payment Info Boxes */}
              <div className="flex justify-between md:gap-4 gap-2 w-full md:px-6 mt-2">
                {paymentGateway.map((item, i) => (
                  <div
                    key={i}
                    className="flex md:flex-row flex-col justify-start items-start md:gap-4 gap-2 border-[2px] border-[#FFFFFF45] rounded-[12px] md:p-3 p-2 md:w-[370px] w-[150px]"
                  >
                    <img
                      src={fileicon}
                      alt="file"
                      className="object-cover md:pt-1 pt-[6px]"
                    />
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-bold text-[11px] md:text-[16px] md:leading-[22px]">
                        {item?.paymentName}
                      </p>
                      <p className="font-normal text-[8px] md:text-[12px] md:leading-[22px] leading-[100%]">
                        {item?.paymentDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buy Button */}
              <div className="relative md:mt-2">
                <div
                  className="rounded-[8px] p-[2px] shadow-[0px_4px_26.2px_0px_#FFFFFF40]"
                  style={{
                    background:
                      "linear-gradient(269.38deg, #FFFFFF -1.01%, rgba(153, 153, 153, 0) 135.19%)",
                  }}
                >
                  <button
                    onClick={openPaymentDialog}
                    className="w-full md:py-5 py-4 rounded-[8px] text-[16px] md:text-[24px] leading-[100%] font-medium text-white transition-all duration-500"
                    style={{
                      background:
                        "linear-gradient(90.59deg, #3F72FF -5.06%, #0036B2 52.68%, #47B4B4 111.62%)",
                    }}
                  >
                    Buy Now
                  </button>
                </div>

                <img
                  src={fifteen}
                  alt="15% Off"
                  className="absolute md:left-20 left-6 bottom-0 object-cover md:h-[70px] h-[53px]"
                />
              </div>
            </div>
          </div>
        </AnimateFromInside>
      </div>
      <StrykexPaymentDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default Pricing;
