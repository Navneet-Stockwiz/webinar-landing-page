import React from "react";
import arrow from "../assets/svg/arrow.svg";

const GradientButton = ({ className = "", ...props }) => {
  return (
    <button
      onClick={() => {}}
      className={`md:flex hidden w-[310px] font-semibold text-[16px] leading-[120%] justify-center items-center gap-4 text-white p-4 rounded-[12px] border-none ${className}`}
      style={{
        background: `
          linear-gradient(268.08deg, #87A1FF 37.37%, #81F0FF 106.77%),
          linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`,
        backgroundBlendMode: "overlay",
      }}
      {...props}
    >
      Subscribe Now
      <span>
        <img src={arrow} alt="arrow" />
      </span>
    </button>
  );
};

export default GradientButton;
