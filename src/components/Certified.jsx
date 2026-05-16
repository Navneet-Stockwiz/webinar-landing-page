import React from "react";
import king from "../assets/svg/king.svg";
import share from "../assets/svg/share.svg";
import certified from "../assets/svg/certified.svg";
import certificate from "../assets/webp/certificate_result.webp";
import { AnimateFromInside } from "../common/ScrollFadeIn";

const Certified = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between md:gap-6 gap-4 bg-[#010611] w-full h-auto md:pt-28 pt-20 pb-8 md:px-80 3xl:px-[450px] px-4">
      {/* Left Section */}
      <div className="flex flex-col md:flex-1 w-full md:gap-8 gap-6 md:justify-start md:items-start justify-center items-center">
        <AnimateFromInside>
          <h2 className="font-semibold text-white md:text-[56px] text-[34px] md:leading-[74px] leading-[100%] font-degular">
            <span className="text-[#FFFFFF99] font-normal">Get </span>
            Certified
          </h2>
        </AnimateFromInside>
        <div className="flex flex-col items-start md:gap-6 gap-4">
          <div className="flex justify-center items-center gap-4">
            <img src={king} alt="king" className="object-cover" />
            <p className="font-medium md:text-[20px] text-[16px] leading-[30px] text-white">
              Earn your credential of Expertise
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <img src={share} alt="share" className="object-cover" />
            <p className="font-medium md:text-[20px] text-[16px] leading-[30px] text-white">
              Share your verified certificate
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <img src={certified} alt="certified" className="object-cover" />
            <p className="font-medium md:text-[20px] text-[16px] leading-[30px] text-white">
              Add certificate to your LinkedIn
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 justify-end items-center w-full">
        <img
          src={certificate}
          alt="certificate"
          className="w-full object-center rounded-[20px]"
        />
      </div>
    </div>
  );
};

export default Certified;
