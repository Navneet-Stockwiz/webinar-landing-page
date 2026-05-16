import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";

export default function TradingStatsCard({ sebiLogo, leftcard, rightcard }) {
  return (
    <AnimateFromInside>
      <div className="md:w-[810px] w-[350px] rounded-[24px] flex justify-center md:mt-16 mt-8 bg-[#0F1330] z-10 relative overflow-hidden">
        <div
          className="flex items-center justify-between text-white rounded-2xl md:px-6 md:py-5 p-3 gap-2 md:gap-8 shadow-md w-full"
          style={{
            border: "1px solid",
            borderImageSource:
              "linear-gradient(90deg, #000000 0%, #FFFFFF 50%, #000000 100%)",
            borderImageSlice: 1,
          }}
        >
          {/* Strategy Count */}
          <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
            <p className="text-[21px] md:text-[48px] font-semibold leading-[30px] md:leading-[48px]">
              10+
            </p>
            <p className="text-[10px] md:text-[16px] font-medium text-[#FFFFFFBF] mt-1 leading-[14px] md:leading-[24px]">
              Pre Built Algo Strategies
            </p>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-gray-700" />

          {/* Turnover */}
          <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
            <p className="text-[21px] md:text-[48px] font-semibold leading-[30px] md:leading-[48px]">
              ₹100 Cr+
            </p>
            <p className="text-[10px] md:text-[16px] font-medium text-[#FFFFFFBF] mt-1 leading-[14px] md:leading-[24px]">
              Daily Trading Turnover
            </p>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-gray-700" />

          {/* SEBI Registered */}
          <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
            <img src={sebiLogo} alt="SEBI Registered" className="h-8 md:h-12 mb-1" />
            <p className="text-[10px] md:text-[16px] font-medium text-[#FFFFFFBF] leading-[14.8px] md:leading-[24px]">
              Registered
            </p>
          </div>
        </div>

        {/* Decorative Images */}
        <img
          src={leftcard}
          alt="Left Decor"
          className="absolute h-20 md:h-32 left-0 top-0 object-contain"
        />
        <img
          src={rightcard}
          alt="Right Decor"
          className="absolute h-20 md:h-32 right-0 bottom-0 object-contain"
        />
      </div>
    </AnimateFromInside>
  );
}
