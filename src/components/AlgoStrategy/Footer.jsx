// components/Footer/Footer.jsx
import React from "react";
import callicon from "../../assets/svg/callicon.svg";
import mailicon from "../../assets/svg/mailicon.svg";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-2 md:block hidden">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="font-medium text-[14px] leading-[100%] text-[#000000BF]">
          Disclaimer: Past performance or backtest data is not indicative of
          future returns.
        </p>
        <p className="font-medium text-[12px] leading-[100%] text-[#000000BF]">
          Accessibility Nodal Officer: Madhur Sancheti | Contact: +91-9414535030
        </p>
      </div>
    </footer>
  );
};

export default Footer;
