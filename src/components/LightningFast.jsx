import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import card16 from "../assets/webp/card16.webp";
import card10 from "../assets/webp/card10.webp";
import { usePaymentDialog } from "../hooks/PaymentDialogContext";

const LightningFast = () => {
  const { openPaymentDialog } = usePaymentDialog();

  return (
    <div className="bg-[#01041A] text-white flex  justify-center items-center md:pt-16 md:pb-28 pb-16 pt-8 w-full md:px-40 px-4">
      <div className="flex flex-col gap-4 justify-center items-center  z-10 rounded-[32px] w-full relative">
        <div>
          <AnimateFromInside>
            <p className="font-semibold md:text-[64px] text-[40px] md:leading-[76px] leading-[48px] font-degular text-center">
              Welcome To The
              <br className="md:hidden block" />
              <span className="md:inline hidden"> Future</span>
            </p>
          </AnimateFromInside>
          <AnimateFromInside>
            <p className="font-semibold md:text-[64px] text-[40px] md:leading-[76px] leading-[48px] font-degular text-center">
              <span className="md:hidden inline"> Future</span> Of Stock{" "}
              <br className="md:hidden block" /> Trading.
            </p>
          </AnimateFromInside>
        </div>
        <AnimateFromInside>
          <p className="font-normal text-[16px] md:leading-[20px] leading-[24px] text-[#9A9CA3] text-center">
            Unleash the power of fully automated systematic trading built on
            tested and <br /> proven strategies to maximize your{" "}
            <br className="md:hidden block" />
            returns - all on autopilot.
          </p>
        </AnimateFromInside>
        <button
          onClick={openPaymentDialog}
          className="bg-white text-black text-[16px] font-semibold rounded-full px-6 py-3 md:mt-4 mt-2 mb-1"
        >
          Get Started
        </button>
        <div className="absolute -z-10 w-full flex justify-center items-center">
          <img src={card16} alt={card16} className="object-cover md:hidden" />
          <img
            src={card10}
            alt={card10}
            className="object-cover md:block hidden max-w-[1260px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LightningFast;
