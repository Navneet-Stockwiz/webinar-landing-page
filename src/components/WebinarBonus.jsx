import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import CTAButton from "../common/CTAButton";
import stockicon from "../assets/svg/stockicon.svg";
import gpticon from "../assets/svg/gpticon.svg";
import manageicon from "../assets/svg/manageicon.svg";

const WebinarBonus = () => {
  const bonuses = [
    {
      id: 1,
      badgeText: "Bonus #1",
      icon: stockicon,
      title: "2 Stock Recommendations <br/> with 150%+ Upside Potential",
      hint: "Hint: These stocks are in the drone tech and clean energy space.",
      value: "Worth Rs 5,000",
    },
    {
      id: 2,
      badgeText: "Bonus #2",
      icon: gpticon,
      title: "Pre Built Chat GPT <br/> Prompts",
      hint: "Hint: These are trained trading bots, who can analyse any trading or investing idea in seconds.",
      value: "Worth Rs 5,000",
    },
    {
      id: 3,
      badgeText: "Bonus #3",
      icon: manageicon,
      title: "Professionally Managed <br/> Portfolio Access",
      hint: "Hint: Unlock a curated pre built investing portfolio of ETFs, stocks and bullions. Worth Rs 13,000",
      value: "Worth Rs 5,000",
    },
  ];

  // Mobile Card Component - Horizontal Layout
  const MobileBonusCard = ({ bonus }) => (
    <div
      className="rounded-[16px] p-4 flex-1 relative mt-6"
      style={{
        background: `linear-gradient(156.59deg, rgba(0, 0, 0, 0.24) 15.11%, rgba(15, 208, 234, 0.24) 90.2%), linear-gradient(211.86deg, rgba(0, 0, 0, 0) 18.48%, rgba(0, 68, 255, 0.24) 78.58%)`,
        position: "relative",
      }}
    >
      {/* Gradient Border with proper radius */}
      <div
        className="absolute inset-0 rounded-[16px] pointer-events-none"
        style={{
          background:
            "linear-gradient(360deg, #FFFFFF 0%, rgba(153, 153, 153, 0) 139.24%)",
          padding: "1px 3px 3px 3px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      ></div>
      {/* Bonus Badge - Centered on top border */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-4">
        <div
          className="font-degular inline-flex items-center text-white px-[20px] py-2 rounded-full text-[20px] leading-[100%] font-semibold"
          style={{
            background: `linear-gradient(96.9deg, #3FADFF 2.48%, #336CDC 49.16%, #47B4B4 96.8%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
            textShadow: "0px 5.98px 70.89px 0px #FFFFFF",
          }}
        >
          {bonus.badgeText}
        </div>
      </div>

      {/* Content Container - Icon, Title and Description in Column */}
      <div className="flex flex-col gap-4 h-full pt-2 items-center">
        {/* Icon */}
        <div className="flex justify-center">
          <img
            src={bonus.icon}
            alt={bonus.badgeText}
            className="w-[42px] h-[42px]"
          />
        </div>

        {/* Title */}
        <div className="w-full">
          <h3
            className="font-degular font-semibold text-[24px] leading-[28px] text-white text-center"
            dangerouslySetInnerHTML={{ __html: bonus.title }}
          ></h3>
        </div>

        {/* Hint */}
        <p className="text-[#A1B5D0] font-normal w-full text-[14px] leading-[18px] text-center flex-grow">
          {bonus.hint}
        </p>

        {/* Value */}
        <div className="flex justify-center items-center">
          <p
            className="font-degular text-white text-[24px] leading-[23px] font-semibold text-center border border-white rounded-full px-4 py-2"
            style={{
              textShadow: "0px 4px 47.4px #FFFFFF",
            }}
          >
            {bonus.value}
          </p>
        </div>
      </div>
    </div>
  );

  // Desktop Card Component - Vertical Layout
  const DesktopBonusCard = ({ bonus }) => (
    <div
      className="rounded-[16px] p-5 flex-1"
      style={{
        background: `linear-gradient(206.92deg, rgba(0, 0, 0, 0.24) 16.84%, rgba(15, 208, 234, 0.24) 93.26%), linear-gradient(132.92deg, rgba(0, 0, 0, 0) 25.91%, rgba(0, 68, 255, 0.24) 94.34%)`,
        position: "relative",
      }}
    >
      {/* Gradient Border with proper radius */}
      <div
        className="absolute inset-0 rounded-[16px] pointer-events-none"
        style={{
          background:
            "linear-gradient(360deg, #FFFFFF 0%, rgba(153, 153, 153, 0) 139.24%)",
          padding: "1px 3px 3px 3px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      ></div>
      {/* Content Container - Vertical Layout */}
      <div className="flex flex-col gap-4 h-full">
        {/* Badge */}
        <div className="flex justify-center">
          <div
            className="inline-flex font-degular items-center text-white px-4 py-[10px] rounded-full text-[28px] leading-[26px] font-semibold"
            style={{
              background: `linear-gradient(96.9deg, #3FADFF 2.48%, #336CDC 49.16%, #47B4B4 96.8%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
              textShadow: "0px 4.44px 52.59px 0px #FFFFFF",
            }}
          >
            {bonus.badgeText}
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <img
            src={bonus.icon}
            alt={bonus.badgeText}
            className="w-[60px] h-[60px]"
          />
        </div>

        {/* Title */}
        <h3
          className="text-white text-[32px] leading-[38px] font-degular font-semibold text-center"
          dangerouslySetInnerHTML={{ __html: bonus.title }}
        ></h3>

        {/* Hint */}
        <p className="text-[#A1B5D0] font-normal text-[18px] leading-[26px] text-center flex-grow">
          {bonus.hint}
        </p>

        {/* Value */}
        <div className="text-center">
          <p
            className="font-degular text-white text-[32px] leading-[23px] font-semibold border border-white rounded-full px-4 py-2 inline-block"
            style={{
              textShadow: "0px 4px 47.4px #FFFFFF",
            }}
          >
            {bonus.value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#010611] text-white flex flex-col md:gap-6 gap-4 justify-center md:px-80 3xl:px-[450px] px-4 pt-8 md:pt-12 pb-8 w-full">
      {/* Heading */}
      <AnimateFromInside>
        <h2 className="font-semibold md:text-[64px] text-[32px] md:leading-[72px] leading-[36px] font-degular text-center">
          <span className="text-[#FFFFFF99] font-normal">
            Today's Exclusive Offer –{" "}
          </span>
          <br className="hidden md:block" />
          Unlock Webinar Bonuses Worth ₹ 25,499
        </h2>
      </AnimateFromInside>
      <AnimateFromInside>
        <p className="font-normal md:text-[20px] text-[14px] md:leading-[30px] leading-[18px] text-[#C8D0E2] text-center mx-auto">
          The best is yet to come. Register today and get mind blowing pre built
          tools to take your trading and investing to the next level.
        </p>
      </AnimateFromInside>

      {/* Bonus Cards */}
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Desktop Layout - Single row of 3 cards */}
        <div className="hidden md:flex gap-6 md:gap-8">
          <AnimateFromInside>
            <div className="flex gap-6 md:gap-8">
              {bonuses.map((bonus) => (
                <DesktopBonusCard key={bonus.id} bonus={bonus} />
              ))}
            </div>
          </AnimateFromInside>
        </div>

        {/* Mobile Layout - Single column */}
        <div className="md:hidden flex flex-col gap-6">
          <AnimateFromInside>
            <div className="flex flex-col gap-6">
              {bonuses.map((bonus) => (
                <MobileBonusCard key={bonus.id} bonus={bonus} />
              ))}
            </div>
          </AnimateFromInside>
        </div>
      </div>
      <AnimateFromInside>
        <div className="flex justify-center items-center">
          <CTAButton />
        </div>
      </AnimateFromInside>
    </div>
  );
};

export default WebinarBonus;
