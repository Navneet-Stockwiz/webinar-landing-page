import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import sebiRegister1 from "../assets/svg/sebiregister1.svg";
import sebiRegister2 from "../assets/svg/sebiregister2.svg";
import sebiRegister3 from "../assets/svg/sebiregister3.svg";

const ComplianceTrust = () => {
  return (
    <section className="w-full bg-[#010611] px-4 md:px-80 3xl:px-[450px] pt-8 md:pt-10 pb-8 md:pb-12">
      <AnimateFromInside>
        <h2 className="font-degular text-center text-[24px] md:text-[40px] leading-[32px] md:leading-[52px]">
          <span className="font-normal text-[#FFFFFF99]">Honest about risk. </span>
          <span className="font-semibold text-white">
            Transparent about compliance.
          </span>
        </h2>
      </AnimateFromInside>

      <div className="mt-4 w-full max-w-[1100px] mx-auto flex flex-col items-center gap-4">
        <AnimateFromInside className="w-full flex justify-center">
          <div className="flex justify-center w-full">
            <img
              src={sebiRegister1}
              alt="SEBI Registered"
              className="object-cover"
              draggable={false}
            />
          </div>
        </AnimateFromInside>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
          <AnimateFromInside className="flex justify-center w-full">
            <div className="flex justify-center w-full">
              <img
                src={sebiRegister2}
                alt="NSE Empanelled Algo Platform"
                className="object-cover"
                draggable={false}
              />
            </div>
          </AnimateFromInside>

          <AnimateFromInside className="flex justify-center w-full">
            <div className="flex justify-center w-full">
              <img
                src={sebiRegister3}
                alt="BSE Empanelled Algo Platform"
                className="object-cover"
                draggable={false}
              />
            </div>
          </AnimateFromInside>
        </div>
      </div>
    </section>
  );
};

export default ComplianceTrust;
