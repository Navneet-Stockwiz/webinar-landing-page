import React from "react";
import line1 from "../../assets/webp/line1.webp";
import linecard from "../../assets/webp/linecard.webp";
import plimage from "../../assets/webp/plimage.webp";
import lockicon from "../../assets/svg/lockicon.svg";
import lockicon1 from "../../assets/svg/lockicon1.svg";
import indexfuture1 from "../../assets/webp/indexfuture1.webp";

const MobileStrategies = ({
  unlockedCards,
  handleUnlockClick,
  activeTab,
  setActiveTab,
  activeTab1,
  setActiveTab1,
  activeTab2,
  setActiveTab2,
}) => {
  return (
    <div className="md:hidden flex flex-col gap-8">
      {/* card 1 */}
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <p className="font-semibold text-[24px] leading-[100%] text-center font-degular">
          Nifty 50 Index Options
        </p>
        <div className="flex flex-col items-center justify-center relative mt-4">
          <img src={linecard} alt="linecard" className="w-full object-cover" />
          <div className="relative">
            <img src={line1} alt="line" className="object-cover w-full" />
            <img
              src={linecard}
              alt="linecard"
              className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                unlockedCards.card1 ? "blur-0" : "blur-md"
              }`}
            />
            {!unlockedCards.card1 && (
              <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center gap-3 p-4">
                <img
                  src={lockicon}
                  alt="lockicon"
                  className="w-[55px] object-cover"
                />
                <p className="font-semibold text-[12px] leading-[100%] text-[#FFFFFFBF]">
                  View Backtest Data
                </p>
                <p className="font-semibold text-[16px] leading-[130%] text-white text-center">
                  <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                    Unlock
                  </span>{" "}
                  backtest results and performance metrics.
                </p>
                <button
                  onClick={() => handleUnlockClick("card1")}
                  className="text-white font-semibold py-3 px-6 rounded-[12px] shadow-md flex justify-center items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(141.14deg, #3FADFF 7.75%, #336CDC 49.32%, #47B4B4 91.74%)",
                  }}
                >
                  <span>
                    <img src={lockicon1} alt="lockicon1" />
                  </span>{" "}
                  Unlock
                </button>
              </div>
            )}
            <img
              src={lockicon}
              alt="lockicon"
              className="absolute top-4 right-4"
            />
          </div>
        </div>
      </div>
      {/* card 2 */}
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <p className="font-semibold text-[24px] leading-[100%] text-center font-degular">
          Bank Nifty Index Options
        </p>
        <div className="flex flex-col items-center justify-center relative mt-4">
          <img src={linecard} alt="linecard" className="w-full object-cover" />
          <div className="relative">
            <img src={line1} alt="line" className="object-cover w-full" />
            <img
              src={indexfuture1}
              alt="indexfuture1"
              className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                unlockedCards.card2 ? "blur-0" : "blur-md"
              }`}
            />
            {!unlockedCards.card2 && (
              <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center gap-3 p-4">
                <img
                  src={lockicon}
                  alt="lockicon"
                  className="w-[55px] object-cover"
                />
                <p className="font-semibold text-[12px] leading-[100%] text-[#FFFFFFBF]">
                  View Backtest Data
                </p>
                <p className="font-semibold text-[16px] leading-[130%] text-white text-center">
                  <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                    Unlock
                  </span>{" "}
                  backtest results and performance metrics.
                </p>
                <button
                  onClick={() => handleUnlockClick("card2")}
                  className="text-white font-semibold py-3 px-6 rounded-[12px] shadow-md flex justify-center items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(141.14deg, #3FADFF 7.75%, #336CDC 49.32%, #47B4B4 91.74%)",
                  }}
                >
                  <span>
                    <img src={lockicon1} alt="lockicon1" />
                  </span>{" "}
                  Unlock
                </button>
              </div>
            )}
            <img
              src={lockicon}
              alt="lockicon"
              className="absolute top-4 right-4"
            />
            {unlockedCards.card2 && (
              <div
                className="absolute top-[60px] left-[15px] p-1 flex justify-between items-center w-[330px] rounded-[10px] font-sans"
                style={{
                  background:
                    "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                }}
              >
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab === "overview"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("monthly")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab === "monthly"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  Monthly Stats
                </button>
                <button
                  onClick={() => setActiveTab("pl")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab === "pl"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  P&L Calculator
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* card 3 */}
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <p className="font-semibold text-[24px] leading-[100%] text-center font-degular">
          Nifty 50 Index Futures
        </p>
        <div className="flex flex-col items-center justify-center relative mt-4">
          <img src={linecard} alt="linecard" className="w-full object-cover" />
          <div className="relative">
            <img src={line1} alt="line" className="object-cover w-full" />
            <img
              src={plimage}
              alt="plimage"
              className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                unlockedCards.card3 ? "blur-0" : "blur-md"
              }`}
            />
            {!unlockedCards.card3 && (
              <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center gap-3 p-4">
                <img
                  src={lockicon}
                  alt="lockicon"
                  className="w-[55px] object-cover"
                />
                <p className="font-semibold text-[12px] leading-[100%] text-[#FFFFFFBF]">
                  View Backtest Data
                </p>
                <p className="font-semibold text-[16px] leading-[130%] text-white text-center">
                  <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                    Unlock
                  </span>{" "}
                  backtest results and performance metrics.
                </p>
                <button
                  onClick={() => handleUnlockClick("card3")}
                  className="text-white font-semibold py-3 px-6 rounded-[12px] shadow-md flex justify-center items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(141.14deg, #3FADFF 7.75%, #336CDC 49.32%, #47B4B4 91.74%)",
                  }}
                >
                  <span>
                    <img src={lockicon1} alt="lockicon1" />
                  </span>{" "}
                  Unlock
                </button>
              </div>
            )}
            <img
              src={lockicon}
              alt="lockicon"
              className="absolute top-4 right-4"
            />
            {unlockedCards.card3 && (
              <div
                className="absolute top-[60px] left-[15px] p-1 flex justify-between items-center w-[330px] rounded-[10px] font-sans"
                style={{
                  background:
                    "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                }}
              >
                <button
                  onClick={() => setActiveTab1("overview")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab1 === "overview"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab1("monthly")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab1 === "monthly"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  Monthly Stats
                </button>
                <button
                  onClick={() => setActiveTab1("pl")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab1 === "pl"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  P&L Calculator
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* card 4 */}
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <p className="font-semibold text-[24px] leading-[100%] text-center font-degular">
          Bank Nifty Index Futures
        </p>
        <div className="flex flex-col items-center justify-center relative mt-4">
          <img src={linecard} alt="linecard" className="w-full object-cover" />
          <div className="relative">
            <img src={line1} alt="line" className="object-cover w-full" />
            <img
              src={plimage}
              alt="plimage"
              className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                unlockedCards.card4 ? "blur-0" : "blur-md"
              }`}
            />
            {!unlockedCards.card4 && (
              <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center gap-3 p-4">
                <img
                  src={lockicon}
                  alt="lockicon"
                  className="w-[55px] object-cover"
                />
                <p className="font-semibold text-[12px] leading-[100%] text-[#FFFFFFBF]">
                  View Backtest Data
                </p>
                <p className="font-semibold text-[16px] leading-[130%] text-white text-center">
                  <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                    Unlock
                  </span>{" "}
                  backtest results and performance metrics.
                </p>
                <button
                  onClick={() => handleUnlockClick("card4")}
                  className="text-white font-semibold py-3 px-6 rounded-[12px] shadow-md flex justify-center items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(141.14deg, #3FADFF 7.75%, #336CDC 49.32%, #47B4B4 91.74%)",
                  }}
                >
                  <span>
                    <img src={lockicon1} alt="lockicon1" />
                  </span>{" "}
                  Unlock
                </button>
              </div>
            )}
            <img
              src={lockicon}
              alt="lockicon"
              className="absolute top-4 right-4"
            />
            {unlockedCards.card4 && (
              <div
                className="absolute top-[60px] left-[15px] p-1 flex justify-between items-center w-[330px] rounded-[10px] font-sans"
                style={{
                  background:
                    "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                }}
              >
                <button
                  onClick={() => setActiveTab2("overview")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab2 === "overview"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab2("monthly")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab2 === "monthly"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  Monthly Stats
                </button>
                <button
                  onClick={() => setActiveTab2("pl")}
                  className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                    activeTab2 === "pl"
                      ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                      : "bg-transparent"
                  }`}
                >
                  P&L Calculator
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStrategies;