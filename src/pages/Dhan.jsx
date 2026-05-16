import React from "react";
import halfimage from "../assets/webp/video1.webp";
import newlogo from "../assets/svg/newlogo.svg";
import light from "../assets/webp/dhanlight.webp";
import engine from "../assets/svg/engine.svg";
import newstrategy from "../assets/svg/newstrategy.svg";
import newstrategy1 from "../assets/svg/newstrategy1.svg";
import football from "../assets/svg/football.svg";
import lock from "../assets/svg/lock.svg";
import phoneicon from "../assets/svg/phoneicon.svg";
import whatsappicon from "../assets/svg/whatsappicon.svg";
import emailicon from "../assets/svg/emailicon.svg";
import xicon from "../assets/svg/xicon.svg";
import dhanicon from "../assets/svg/dhanicon.svg";

const Dhan = () => {
  return (
    <div className="relative bg-[#01041A] text-white w-full min-h-screen font-sans overflow-hidden z-10">
      {/* Background Light Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <img
          src={light}
          alt="background light"
          className="w-full object-cover -z-10 md:h-auto h-[50%]"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 md:px-20 md:py-1 py-3 bg-white">
        <div className="flex flex-col justify-start items-start">
          <img
            src={newlogo}
            alt="Logo"
            className="md:w-[120px] md:h-auto h-[30px] object-contain"
          />
          <p className="text-[14px] font-medium text-[#000000BF] mt-1 font-degular">
            A Stockwiz Product
          </p>
        </div>
        <nav className="hidden md:flex gap-8 text-[21px] leading-[75px] font-medium text-black">
          {["Home", "Dashboard", "My Strategies", "Backtest"].map(
            (label, idx) => (
              <a
                key={idx}
                href="#"
                className="text-[18px] text-[#000000BF] font-medium"
              >
                {label}
              </a>
            )
          )}
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex flex-col md:flex-row justify-between items-center pt-4 md:pb-0 pb-6 md:pt-16 md:gap-10 gap-4">
        {/* Left Content */}
        <div className="md:flex-1 w-full flex flex-col justify-start items-start md:gap-10 gap-4  md:pl-20 px-4">
          <p className="font-medium text-[40px]  md:text-[96px]  md:leading-[105px] leading-[44px] text-left font-degular text-white z-10">
            Unleash <br className="block md:hidden" /> the Power of <br />
            <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
              Automated Trading
            </span>
          </p>

          <p className="font-normal text-[14px] md:text-[24px] md:leading-[38px] leading-[22px] text-[#EAEAEA] tracking-normal font-inter">
            Unleash the power of fully automatic{" "}
            <br className="block md:hidden" /> systematic trading, to{" "}
            <br className="hidden sm:block" /> change your trading
            <br className="block md:hidden" /> game forever.
          </p>

          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center md:justify-start gap-3 md:gap-4 md:w-[832px] w-full font-degular">
            {/* 1st */}
            <div className="bg-[#FFFFFF0F] font-semibold flex items-center justify-start gap-4 backdrop-blur-md w-full md:w-[196px] p-4 rounded-[11px] md:text-[20px] md:leading-[27px] text-sm  text-white">
              <img
                src={engine}
                alt="engine"
                className="object-cover h-[35px]"
              />
              <div className="flex flex-col gap-1">
                <span className="bg-[linear-gradient(97.91deg,_#0058FF_-36.09%,_#FFFFFF_39.46%)] bg-clip-text text-transparent">
                  Lightning Fast
                </span>
                <span className="text-white">Trading Engine</span>
              </div>
            </div>

            {/* 2nd */}
            <div className="bg-[#FFFFFF0F] flex items-center justify-start gap-4 backdrop-blur-md w-full md:w-[196px] p-4 rounded-[11px] md:text-[20px] md:leading-[27px] text-sm  font-medium text-white">
              <img
                src={newstrategy}
                alt="newstrategy"
                className="object-cover h-[35px]"
              />
              <div className="flex flex-col gap-1">
                <span className="bg-[linear-gradient(97.91deg,_#0058FF_-36.09%,_#FFFFFF_39.46%)] bg-clip-text text-transparent">
                  Premium Algo
                </span>
                <span className="text-white">Strategies</span>
              </div>
            </div>

            {/* 3rd */}
            <div className="bg-[#FFFFFF0F] flex items-center justify-start gap-4 backdrop-blur-md w-full md:w-[196px] p-4 rounded-[11px] md:text-[20px] md:leading-[27px] text-sm font-medium text-white">
              <img
                src={newstrategy1}
                alt="newstrategy1"
                className="object-cover h-[35px]"
              />
              <div className="flex flex-col gap-1">
                <span className="bg-[linear-gradient(97.91deg,_#0058FF_-36.09%,_#FFFFFF_39.46%)] bg-clip-text text-transparent">
                  Build Your
                </span>
                <span className="text-white">Strategies</span>
              </div>
            </div>

            {/* 4th */}
            <div className="bg-[#FFFFFF0F] flex items-center justify-start gap-4 backdrop-blur-md w-full md:w-[196px] p-4 rounded-[11px] md:text-[20px] md:leading-[27px] text-sm font-medium text-white">
              <img
                src={football}
                alt="football"
                className="object-cover h-[35px]"
              />
              <div className="flex flex-col gap-1">
                <span className="bg-[linear-gradient(97.91deg,_#0058FF_-36.09%,_#FFFFFF_39.46%)] bg-clip-text text-transparent">
                  Live Trading
                </span>
                <span className="text-white">Support</span>
              </div>
            </div>
          </div>

          <div className="relative text-white p-5 flex flex-col rounded-2xl gap-4 shadow-lg md:w-[832px] w-full overflow-hidden bg-[#FFFFFF0F]">
            {/* Border Gradient Layer */}
            <div
              className="absolute inset-0 rounded-2xl font-inter"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, #FFFFFF 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            ></div>

            {/* Content */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="md:flex hidden  gap-2">
                <img
                  src={lock}
                  alt="football"
                  className="object-cover h-7 w-7"
                />
                <div className="flex flex-col justify-start items-start gap-1">
                  <h2 className="font-semibold text-[24px] leading-[123%]">
                    Activate{" "}
                    <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
                      StrykeX
                    </span>{" "}
                    Algos
                  </h2>
                  <p className="font-normal text-[#FFFFFFBF] text-[12px] md:leading-[138%] leading-[123%]">
                    Click on the below mentioned buttons to activate your plan
                  </p>
                </div>
              </div>
              <div className="md:hidden flex flex-col gap-2">
                <div className="flex md:justify-end items-center md:gap-1 gap-2">
                  <img
                    src={lock}
                    alt="football"
                    className="object-cover h-7 w-7"
                  />
                  <h2 className="md:text-[24px] text-[20px] font-medium">
                    Activate{" "}
                    <span className="inline-block bg-[linear-gradient(280.72deg,_#87A1FF_40.8%,_#81F0FF_87.18%)] bg-clip-text text-transparent">
                      StrykeX
                    </span>{" "}
                    Algos
                  </h2>
                </div>
                <span className="font-normal text-[#FFFFFFBF] text-[12px] md:leading-[138%] leading-[123%]">
                  Click on the below mentioned buttons to activate your plan
                </span>
              </div>
              <div className="md:flex hidden flex-col gap-2">
                <div className="flex md:justify-end items-center gap-2">
                  <img
                    src={football}
                    alt="football"
                    className="object-cover h-5 w-5"
                  />
                  <span className="font-medium text-[17px] leading-[123%] text-white underline">
                    {" "}
                    Need Help?
                  </span>
                </div>
                <span className="font-medium text-[#FFFFFFBF] text-[12px] md:leading-[138%] leading-[123%]">
                  Click here to connect with our support team
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="font-semibold md:text-[16px] text-[14px] leading-[100%] rounded-[10px] flex-1 flex items-center justify-center gap-2 text-white border border-[#FFFFFF85] py-3 px-4 transition bg-[linear-gradient(91.74deg,_#050505_-31%,_#46B48D_111.93%)] hover:opacity-90">
                <img src={xicon} alt="xicon" className="object-cover " /> Create
                a Free Dhan Demat Account
              </button>
              <button className="font-semibold md:text-[16px] text-[14px] leading-[100%] flex-1 flex items-center justify-center gap-2 border border-[#FFFFFF] text-white py-3 px-4 rounded-[10px]">
                <img src={dhanicon} alt="dhanicon" className="object-cover " />{" "}
                Connect Existing Dhan Account
              </button>
            </div>
            <div className="md:hidden block flex-col gap-2">
              <div className="flex md:justify-end items-center md:gap-1 gap-2">
                <img
                  src={football}
                  alt="football"
                  className="object-cover h-5 w-5"
                />
                <span className="font-medium text-white underline">
                  {" "}
                  Need Help?
                </span>
              </div>
              <span className="font-medium text-[#FFFFFFBF] text-[12px] md:leading-[138%] leading-[123%]">
                Click here to connect with our support team
              </span>
            </div>
          </div>

          <div className="flex md:flex-nowrap flex-wrap justify-center items-center gap-y-2 gap-x-4 md:gap-x-10 text-sm text-white/60 w-full font-inter">
            <div className="font-normal text-[14px] leading-[150%] flex items-center justify-center gap-2">
              <img src={phoneicon} alt="phoneicon" className="object-cover" />
              +91 - 8065919278
            </div>
            <div className="font-normal text-[14px] leading-[150%] flex items-center justify-center gap-2">
              <img
                src={whatsappicon}
                alt="whatsappicon"
                className="object-cover"
              />
              +91 - 8905939199
            </div>
            <div className="font-normal text-[14px] leading-[150%] flex items-center justify-center gap-2">
              <img
                src={whatsappicon}
                alt="whatsappicon"
                className="object-cover"
              />
              +91 - 7850934748
            </div>
            <div className="font-normal text-[14px] leading-[150%] flex items-center justify-center gap-2">
              <img src={emailicon} alt="emailicon" className="object-cover" />
              help@stockwiz.in
            </div>
          </div>
        </div>

        {/* Right Image (Mockup) */}
        <div className="md:flex-1 w-full flex items-center justify-end relative md:left-10 left-4">
          <img src={halfimage} alt="App Preview" className="object-cover" />
        </div>
      </main>
    </div>
  );
};

export default Dhan;
