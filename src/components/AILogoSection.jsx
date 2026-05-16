import React from "react";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import chatgpt from "../assets/svg/chatgpt-3 1.svg";
import claude from "../assets/svg/claude-3 1.svg";
import gemini from "../assets/svg/gemini-ai 1.svg";
import grock from "../assets/svg/grok-3 1.svg";
import perplexity from "../assets/svg/Perplexity_AI-Logo.wine 1.svg";
import strykex from "../assets/svg/StrykeX White 3.svg";
import staricon from "../assets/svg/staricon.svg";

const AILogoSection = () => {
  const logos = [
    { icon: chatgpt, name: "chatgpt" },
    { icon: claude, name: "claude" },
    { icon: strykex, name: "strykex" },
    { icon: grock, name: "grock" },
    { icon: perplexity, name: "perplexity" },
    { icon: gemini, name: "gemini" },
  ];

  // Create multiple copies for seamless marquee effect on mobile
  const logosForMarquee = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="bg-[#010611] text-white flex flex-col items-center md:px-40 md:pt-16 pt-20 gap-6 w-full">
      <div className="flex flex-col md:gap-8 gap-4 justify-center items-center w-full md:py-5 py-2">
        <AnimateFromInside>
          <p className="text-center w-full font-medium md:text-[24px] text-[18px] leading-[28px]">
            Powerful AI{" "}
            <img
              src={staricon}
              alt={staricon}
              className="object-cover md:h-[30px] h-[20px] inline"
            />{" "}
            Tools To Supercharge Your <br className="md:hidden block" /> Wealth
            Creation
          </p>
        </AnimateFromInside>

        {/* Mobile: Marquee animation */}
        <div className="overflow-hidden group z-20 w-screen md:hidden">
          <div className="flex items-center gap-6 h-auto animate-marquee1 group-hover:[animation-play-state:paused]">
            {logosForMarquee.map((logo, index) => (
              <React.Fragment key={index}>
                <div className="flex justify-center items-center shrink-0">
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    className="object-cover h-[32px]"
                  />
                </div>
                {/* Add vertical border between logos in mobile */}
                <div className="h-6 w-px bg-gray-400 shrink-0"></div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Desktop: Static layout */}
        <div className="hidden md:flex items-center justify-center gap-6 h-auto w-full">
          {logos.map((logo, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-center items-center h-[50px]">
                <img src={logo.icon} alt={logo.name} className="object-cover" />
              </div>
              {index < logos.length - 1 && (
                <div className="h-8 w-px bg-gray-400"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AILogoSection;
