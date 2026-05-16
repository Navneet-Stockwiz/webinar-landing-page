import React from "react";
import coachellipse from "../assets/webp/caochellipsenew.webp";
import coachellipsemobile from "../assets/webp/coachellipsemobile.webp";
import ceo from "../assets/webp/ceo2_result.webp";
import ceomobile from "../assets/webp/ceomobile.webp";
import verified from "../assets/svg/verifiednw.svg";
import instagram from "../assets/svg/instagramnew.svg";
import management from "../assets/svg/management.svg";
import enroll from "../assets/svg/enroll.svg";
import q from "../assets/webp/q_result.webp";
import r from "../assets/webp/r_result.webp";
import s from "../assets/webp/s_result.webp";
import t from "../assets/webp/t_result.webp";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import CTAButton from "../common/CTAButton";

const Coach = () => {
  const logos = [
    { icon: q, name: "q" },
    { icon: r, name: "r" },
    { icon: s, name: "s" },
    { icon: t, name: "t" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 md:gap-10 bg-[#010611] h-auto pt-8 md:pt-12 pb-8 md:px-80 3xl:px-[450px] px-4 w-full">
      {/* Heading */}
      <AnimateFromInside>
        <h2 className="font-semibold text-white md:text-[56px] text-[32px] md:leading-[74px] leading-[38px] font-degular text-center w-full">
          <span className="text-[#FFFFFF99] font-normal">Meet your &nbsp;</span>
          Coach
        </h2>
      </AnimateFromInside>
      {/* Main Container */}
      <div className="w-full flex justify-center">
        <div className="relative z-20 flex md:flex-row flex-col w-full h-auto items-center justify-center md:gap-10 gap-6 md:px-8 md:py-12 px-3  py-6 bg-[#FFFFFF0F] md:rounded-tl-[48px] rounded-[24px]">
          {/* Mobile Name and Title at top of card */}
          <div className="md:hidden absolute top-4 left-4 right-4 z-30 flex flex-col gap-3 items-start text-left">
            <p className="md:text-[24px]  text-[40px] md:leading-[28px] leading-[44px] font-medium text-white">
              Parang Mehta
            </p>
            <p
              className="font-semibold font-poppins text-[13px] leading-4 text-white py-2 px-3 md:w-fit w-full rounded-md"
              style={{
                background:
                  "linear-gradient(90.51deg, #3FADFF 2.31%, #336CDC 49.36%, #47B4B4 97.38%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
              }}
            >
              FOUNDER & CEO, STOCKWIZ TECHNOLOGIES
            </p>
          </div>

          {/* CEO Image positioned at bottom-right of main card */}
          <img
            src={ceo}
            alt="CEO"
            className="md:block hidden absolute md:-right-10 -right-4 md:bottom-0 bottom-0 object-contain md:w-[546px] w-[280px] md:h-[607px] h-[320px] z-10"
          />
          <img
            src={ceomobile}
            alt="CEO"
            className="md:hidden absolute left-0 top-36 h-[313px] object-cover  z-10"
          />
          {/* left Content */}
          <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start justify-start md:w-[45%] w-full px-2 md:px-4 order-2 md:order-1 pt-40 md:pt-0">
            {/* Desktop Name and Title */}
            <div className="md:flex hidden flex-col gap-8">
              <p className="text-[65px] font-medium leading-[70px] text-white">
                Parang Mehta
              </p>
              <p
                className="font-semibold font-poppins md:text-[20px] leading-6 text-white py-2 px-4 w-fit rounded-md"
                style={{
                  background:
                    "linear-gradient(90.51deg, #3FADFF 2.31%, #336CDC 49.36%, #47B4B4 97.38%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
                }}
              >
                FOUNDER & CEO, STOCKWIZ TECHNOLOGIES
              </p>
            </div>

            <p className="font-normal md:text-[18px] text-[14px] md:leading-[26px] leading-[22px] text-[#FFFFFF] text-left">
              I’m the founder of Stockwiz, India’s fastest-growing
              SEBI-registered trading platform. Over the last 10+ years, I’ve
              traded across Indian, American, and European markets, blending
              hands-on market experience with academic rigor — an MBA in
              Finance, FMVA certification, and currently a CFA Level III
              candidate.
              <br /> <br /> What drives me is helping traders and investors
              build confidence in their strategies. So far, I’ve had the
              privilege of guiding 2,00,000+ people in their trading and
              investing journey. Along the way, my work has been featured on
              TEDx, CNBC, Moneycontrol, Inc42, and more.
            </p>

            {/* Verified Badge */}
            <div className="flex justify-center w-full md:max-w-[470px] items-center gap-3 md:gap-5 rounded-[12px] bg-[#FFFFFF0F] md:py-4 py-3 shadow-lg">
              <img
                src={verified}
                alt="SEBI Verified"
                className="object-cover md:h-[78px] h-[52px]"
              />
              <div className="flex flex-col gap-2 md:gap-[10px]">
                <p className="font-normal font-inter text-sm md:text-[20px] leading-[100%] text-[#FFFFFF]">
                  SEBI Registered Research Analyst
                </p>
                <p className="text-[16px] md:text-[24px] leading-[100%] font-medium text-white">
                  INH000013925
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative w-full flex items-center justify-center order-1 md:order-2">
            <div className="relative md:h-[650px] h-[300px] w-full md:w-[395px] max-w-[350px] md:max-w-none">
              {/* social media card */}
              <div className="bg-white p-2 absolute md:top-28 top-56 md:left-6 left-36 flex justify-center items-center gap-2 z-20 rounded-md">
                <img
                  src={instagram}
                  alt="instagram"
                  className="md:w-7 w-4 md:h-7 h-4 object-cover"
                />
                <p className="font-semibold md:text-[18.5px] text-[10px] leading-[100%] text-[#2160FC]">
                  1,00,000+{" "}
                  <span className="font-normal md:text-[14.36px] text-[8px] leading-[100%] text-[#000000]">
                    Followers
                  </span>
                </p>
              </div>
              <div className="bg-white p-2 absolute md:top-64 top-40 md:-left-6 left-44 flex justify-center items-center gap-2 z-20 rounded-md">
                <img
                  src={enroll}
                  alt="enroll"
                  className="md:w-[37px] md:h-[27px] w-4 h-4 object-cover"
                />
                <p className="font-semibold md:text-[18.5px] text-[10px] leading-[100%] text-[#2160FC]">
                  2L+ Students{" "}
                  <span className="font-normal md:text-[14.36px] text-[8px] leading-[100%] text-[#000000]">
                    Enrolled
                  </span>
                </p>
              </div>
              <div className="bg-white p-2 absolute md:top-96 top-72 md:left-0 left-44 flex justify-center items-center gap-2 z-20 rounded-md">
                <img
                  src={management}
                  alt="management"
                  className="md:w-[34px] w-4 md:h-[34px] h-4 object-cover"
                />
                <p className="font-semibold md:text-[18.5px] text-[10px] leading-[100%] text-[#2160FC]">
                  Rs 150 Crore+ <br />
                  <span className="font-normal md:text-[14.36px] text-[8px] leading-[100%] text-[#000000]">
                    Assets Under Management
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Featured In Section - positioned outside container */}
          <div className="absolute md:bottom-0 md:top-auto top-[430px] md:left-auto left-0 right-0 bg-white shadow-lg flex justify-center items-center gap-2 md:gap-4 whitespace-nowrap md:rounded-l-[12px] rounded-r-[6px] md:py-2 md:px-8 md:p-0 p-2 z-10 w-[315px] md:w-[450px]">
            <p className="font-poppins font-semibold md:text-[17px] text-[12px] md:leading-[25px] leading-[16px] text-[#101010]">
              Featured In
            </p>
            <div className="flex justify-center items-center gap-3 md:gap-4">
              {logos.map((logo, index) => (
                <div key={index} className="flex justify-center items-center">
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Background Image */}
          <img
            src={coachellipse}
            alt="Coach Background"
            className="md:block hidden absolute right-0 md:bottom-0 top-0 rounded-2xl -z-10 object-cover md:w-[550px] w-[300px] md:h-[700px] h-[400px]"
          />
          {/* Background Image */}
          <img
            src={coachellipsemobile}
            alt="Coach Background"
            className="md:hidden absolute left-0 top-20"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-0 items-center justify-center w-full text-center">
        <p className="font-medium  md:font-poppins text-[14px] md:text-[20px] leading-[20px] md:leading-[30px] text-center text-white">
          Always learning, always building — and always excited about what’s
          next in the markets. 🚀
        </p>
        <AnimateFromInside>
          <CTAButton />
        </AnimateFromInside>
      </div>
    </div>
  );
};

export default Coach;
