import React, { useState } from "react";
import line from "../../assets/webp/line.webp";
import line1 from "../../assets/webp/line1.webp";
import linecard from "../../assets/webp/linecard.webp";
import plimage from "../../assets/webp/plimage.webp";
import cardbg from "../../assets/webp/cardbg.webp";
import lockicon from "../../assets/svg/lockicon.svg";
import lockicon1 from "../../assets/svg/lockicon1.svg";
import UnlockDialog from "./UnlockDialog";
import bullishmomentumoverview from "../../assets/webp/FinNiftyOptionScalperCE/1.webp";
import bullishbankniftymummonthlystats from "../../assets/webp/FinNiftyOptionScalperCE/2.webp";
import bullishbanckniftyoverview from "../../assets/webp/FinNiftyOptionScalperPE/3.webp";
import bullishniftymonthlystats from "../../assets/webp/FinNiftyOptionScalperPE/4.webp";
import bearishhniftyoverview from "../../assets/webp/NiftyBlitzFutures/5.webp";
import bearishniftymonthlystats from "../../assets/webp/NiftyBlitzFutures/6.webp";
import bearishhbanckniftyoverview from "../../assets/webp/MidcapNiftyBlitzFutures/7.webp";
import bearishbankniftymonthlystats from "../../assets/webp/MidcapNiftyBlitzFutures/8.webp";
import algocard1 from "../../assets/webp/algocard1.webp";
import algocard2 from "../../assets/webp/algocard2.webp";
import algocard3 from "../../assets/webp/algocard3.webp";
import { AnimateFromInside } from "../../common/ScrollFadeIn";
import BullishBearishToggle from "../BullishBearishToggle";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
];

function valuetext(value) {
  return `${value}x`;
}

const Strategies = () => {
  const [activeButton, setActiveButton] = useState("Bullish");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [unlockedCards, setUnlockedCards] = useState(() => ({
    card1: sessionStorage.getItem("card1Unlocked") === "true",
    card2: sessionStorage.getItem("card2Unlocked") === "true",
    card3: sessionStorage.getItem("card3Unlocked") === "true",
    card4: sessionStorage.getItem("card4Unlocked") === "true",
  }));
  const [currentCard, setCurrentCard] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // Card 2
  const [activeTab1, setActiveTab1] = useState("overview"); // Card 3
  const [activeTab2, setActiveTab2] = useState("overview"); // Card 1
  const [activeTab3, setActiveTab3] = useState("overview"); // Card 4
  const [multiplier1, setMultiplier1] = useState(1); // Card 1
  const [multiplier2, setMultiplier2] = useState(1); // Card 2
  const [multiplier3, setMultiplier3] = useState(1); // Card 3
  const [multiplier4, setMultiplier4] = useState(1); // Card 4
  const baseProfit1 = 90000;
  const baseProfit2 = 300000;
  const baseProfit3 = 90000;
  const baseProfit4 = 375000;

  const handleUnlockClick = (cardKey) => {
    setCurrentCard(cardKey);
    setIsDialogOpen(true);
  };

  const handleViewImageClick = () => {
    if (currentCard) {
      setUnlockedCards((prev) => ({
        ...prev,
        [currentCard]: true,
      }));
      sessionStorage.setItem(`${currentCard}Unlocked`, "true");
    }
    setIsDialogOpen(false);
    setCurrentCard(null);
  };

  return (
    <div className="bg-[#01041A] text-white flex flex-col gap-4 justify-center md:px-40 px-4 pb-16 items-center w-full h-auto">
      <AnimateFromInside>
        <p className="font-semibold md:text-[64px] text-[40px] leading-[100%] text-white font-degular text-center">
          Featured Strategies
        </p>
      </AnimateFromInside>

      <AnimateFromInside>
        <p className="font-normal md:text-[24px] text-[14px] md:leading-[33px] tracking-normal leading-[22px] text-center text-[#FFFFFFBF]/[0.75]">
          Unleash the power of algorithmic systematic trading to supercharge
          your trading journey.
        </p>
      </AnimateFromInside>
      <BullishBearishToggle
        active={activeButton}
        onChange={(val) => setActiveButton(val)}
      />

      {/* Desktop view */}
      {activeButton === "Bullish" && (
        <>
          {/* Card 1: Nifty 50 Index Options */}
          <div className="md:flex hidden flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] font-degular">
              Nifty 50 Index Options
            </p>
            <div className="flex items-center justify-center relative mt-4">
              <img
                src={algocard1}
                alt="algocard1"
                className="h-[400px] object-cover"
              />
              <div className="relative">
                <img src={line} alt="line" className="object-cover h-[400px]" />
                <img
                  src={
                    activeTab2 === "overview"
                      ? bullishmomentumoverview
                      : activeTab2 === "monthly"
                      ? bullishniftymonthlystats
                      : cardbg
                  }
                  alt="linecard"
                  className={`object-cover absolute h-[390px] left-[95px] top-[6px] p-2 transition-all duration-300 ${
                    unlockedCards.card1 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card1 && (
                  <div className="absolute inset-0 left-44 flex flex-col justify-center items-center gap-4 w-[60%]">
                    <img src={lockicon} alt="lockicon" />
                    <p className="font-semibold text-[20px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold text-[26px] leading-[120%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br /> performance metrics.
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
                {unlockedCards.card1 && (
                  <div
                    className="absolute top-[25px] left-[113px] p-1 flex justify-between items-center w-[528px] rounded-[10px] font-sans"
                    style={{
                      background:
                        "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                    }}
                  >
                    <button
                      onClick={() => setActiveTab2("overview")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab2 === "overview"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab2("monthly")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab2 === "monthly"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Monthly Stats
                    </button>
                    <button
                      onClick={() => setActiveTab2("pl")}
                      className={`min-w-[150px] px-4 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab2 === "pl"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      P&L Calculator
                    </button>
                  </div>
                )}
                {unlockedCards.card1 && activeTab2 === "pl" && (
                  <div>
                    <p
                      className={`bg-[#00000042] rounded-[10px] py-1 px-4 text-[20px] leading-[160%] text-white font-bold absolute top-[130px] right-7 ${
                        unlockedCards.card1 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit1 * multiplier1).toLocaleString("en-IN")}
                    </p>
                    <div
                      className={`absolute flex flex-col items-start justify-start gap-6 top-[135px] left-[124px] z-5 w-[508px] ${
                        unlockedCards.card1 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <label className="text-white font-medium text-[20px]">
                          Investment Multiplier ({multiplier1}x)
                        </label>
                        <Box sx={{ width: "100%" }}>
                          <Slider
                            aria-label="Zoom"
                            value={multiplier1}
                            onChange={(e, val) => setMultiplier1(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "16px",
                                marginTop: "-2px",
                              },
                            }}
                          />
                        </Box>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-3">
                        <div className="flex justify-between items-center p-3 bg-[#55EF3D1A] rounded-[13px] w-[508px]">
                          <p className="font-semibold text-[20px] leading-[29px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-2 px-4 text-[24px] leading-[160%] text-[#4EFF32] font-semibold">
                            ₹
                            {(baseProfit1 * multiplier1).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[12px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-[508px]">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Bank Nifty Index Options */}
          <div className="md:flex hidden flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] font-degular">
              Bank Nifty Index Options
            </p>
            <div className="flex items-center justify-center relative mt-4">
              <img
                src={algocard2}
                alt="linecar2"
                className="h-[400px] object-cover"
              />
              <div className="relative">
                <img src={line} alt="line" className="object-cover h-[400px]" />
                <img
                  src={
                    activeTab === "overview"
                      ? bullishbanckniftyoverview
                      : activeTab === "monthly"
                      ? bullishbankniftymummonthlystats
                      : cardbg
                  }
                  alt="indexfuture1"
                  className={`object-cover absolute h-[390px] left-[95px] top-[6px] p-2 transition-all duration-300 ${
                    unlockedCards.card2 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card2 && (
                  <div className="absolute inset-0 left-44 flex flex-col justify-center items-center gap-4 w-[60%]">
                    <img src={lockicon} alt="lockicon" />
                    <p className="font-semibold text-[20px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold text-[26px] leading-[120%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br /> performance metrics.
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
                {unlockedCards.card2 && (
                  <div
                    className="absolute top-[25px] left-[113px] p-1 flex justify-between items-center w-[528px] rounded-[10px] font-sans"
                    style={{
                      background:
                        "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                    }}
                  >
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab === "overview"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("monthly")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab === "monthly"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Monthly Stats
                    </button>
                    <button
                      onClick={() => setActiveTab("pl")}
                      className={`min-w-[150px] px-4 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab === "pl"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      P&L Calculator
                    </button>
                  </div>
                )}
                {unlockedCards.card2 && activeTab === "pl" && (
                  <div>
                    <p
                      className={`bg-[#00000042] rounded-[10px] py-1 px-4 text-[20px] leading-[160%] text-white font-bold absolute top-[130px] right-7 ${
                        unlockedCards.card2 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit2 * multiplier2).toLocaleString("en-IN")}
                    </p>
                    <div
                      className={`absolute flex flex-col items-start justify-start gap-6 top-[135px] left-[124px] z-5 w-[508px] ${
                        unlockedCards.card2 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <label className="text-white font-medium text-[20px]">
                          Investment Multiplier ({multiplier2}x)
                        </label>
                        <Box sx={{ width: "100%" }}>
                          <Slider
                            aria-label="Zoom"
                            value={multiplier2}
                            onChange={(e, val) => setMultiplier2(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "16px",
                                marginTop: "-2px",
                              },
                            }}
                          />
                        </Box>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-3">
                        <div className="flex justify-between items-center p-3 bg-[#55EF3D1A] rounded-[13px] w-[508px]">
                          <p className="font-semibold text-[20px] leading-[29px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-2 px-4 text-[24px] leading-[160%] text-[#4EFF32] font-semibold">
                            ₹
                            {(baseProfit2 * multiplier2).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[12px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-[508px]">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {activeButton === "Bearish" && (
        <>
          {/* Card 3: Nifty 50 Index Futures */}
          <div className="md:flex hidden flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] font-degular">
              Nifty 50 Index Futures
            </p>
            <div className="flex items-center justify-center relative mt-4">
              <img
                src={algocard1}
                alt="algocard1"
                className="h-[400px] object-cover"
              />
              <div className="relative">
                <img src={line} alt="line" className="object-cover h-[400px]" />
                <img
                  src={
                    activeTab1 === "overview"
                      ? bearishhniftyoverview
                      : activeTab1 === "monthly"
                      ? bearishniftymonthlystats
                      : cardbg
                  }
                  alt="plimage"
                  className={`object-cover absolute h-[390px] left-[95px] top-[6px] p-2 transition-all duration-300 ${
                    unlockedCards.card3 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card3 && (
                  <div className="absolute inset-0 left-44 flex flex-col justify-center items-center gap-4 w-[60%]">
                    <img src={lockicon} alt="lockicon" />
                    <p className="font-semibold text-[20px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold text-[26px] leading-[120%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br /> performance metrics.
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
                {unlockedCards.card3 && (
                  <div
                    className="absolute top-[25px] left-[113px] p-1 flex justify-between items-center w-[528px] rounded-[10px] font-sans"
                    style={{
                      background:
                        "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                    }}
                  >
                    <button
                      onClick={() => setActiveTab1("overview")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab1 === "overview"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab1("monthly")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab1 === "monthly"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Monthly Stats
                    </button>
                    <button
                      onClick={() => setActiveTab1("pl")}
                      className={`min-w-[150px] px-4 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab1 === "pl"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      P&L Calculator
                    </button>
                  </div>
                )}
                {unlockedCards.card3 && activeTab1 === "pl" && (
                  <div>
                    <p
                      className={`bg-[#00000042] rounded-[10px] py-1 px-4 text-[20px] leading-[160%] text-white font-bold absolute top-[130px] right-7 ${
                        unlockedCards.card3 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit3 * multiplier3).toLocaleString("en-IN")}
                    </p>
                    <div
                      className={`absolute flex flex-col items-start justify-start gap-6 top-[135px] left-[124px] z-5 w-[508px] ${
                        unlockedCards.card3 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <label className="text-white font-medium text-[20px]">
                          Investment Multiplier ({multiplier3}x)
                        </label>
                        <Box sx={{ width: "100%" }}>
                          <Slider
                            aria-label="Zoom"
                            value={multiplier3}
                            onChange={(e, val) => setMultiplier3(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "16px",
                                marginTop: "-2px",
                              },
                            }}
                          />
                        </Box>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-3">
                        <div className="flex justify-between items-center p-3 bg-[#55EF3D1A] rounded-[13px] w-[508px]">
                          <p className="font-semibold text-[20px] leading-[29px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-2 px-4 text-[24px] leading-[160%] text-[#4EFF32] font-semibold">
                            ₹
                            {(baseProfit3 * multiplier3).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[12px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-[508px]">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Bank Nifty Index Futures */}
          <div className="md:flex hidden flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] font-degular">
              Bank Nifty Index Futures
            </p>
            <div className="flex items-center justify-center relative mt-4">
              <img
                src={algocard3}
                alt="algocard3"
                className="h-[400px] object-cover"
              />
              <div className="relative">
                <img src={line} alt="line" className="object-cover h-[400px]" />
                <img
                  src={
                    activeTab3 === "overview"
                      ? bearishhbanckniftyoverview
                      : activeTab3 === "monthly"
                      ? bearishbankniftymonthlystats
                      : cardbg
                  }
                  alt="cardbg"
                  className={`object-cover absolute h-[390px] left-[95px] top-[6px] p-2 transition-all duration-300 ${
                    unlockedCards.card4 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card4 && (
                  <div className="absolute inset-0 left-44 flex flex-col justify-center items-center gap-4 w-[60%]">
                    <img src={lockicon} alt="lockicon" />
                    <p className="font-semibold text-[20px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold text-[26px] leading-[120%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br /> performance metrics.
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
                {unlockedCards.card4 && (
                  <div
                    className="absolute top-[25px] left-[113px] p-1 flex justify-between items-center w-[528px] rounded-[10px] font-sans"
                    style={{
                      background:
                        "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                    }}
                  >
                    <button
                      onClick={() => setActiveTab3("overview")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab3 === "overview"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Overview
                    </button>

                    <button
                      onClick={() => setActiveTab3("monthly")}
                      className={`min-w-[150px] px-6 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab3 === "monthly"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      Monthly Stats
                    </button>

                    <button
                      onClick={() => setActiveTab3("pl")}
                      className={`min-w-[150px] px-4 py-3 rounded-[7.8px] text-white text-[20px] leading-[28.9px] text-center transition-all duration-300 ease-in-out ${
                        activeTab3 === "pl"
                          ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                          : "bg-transparent"
                      }`}
                    >
                      P&L Calculator
                    </button>
                  </div>
                )}

                {unlockedCards.card4 && activeTab3 === "pl" && (
                  <div>
                    <p
                      className={`bg-[#00000042] rounded-[10px] py-1 px-4 text-[20px] leading-[160%] text-white font-bold absolute top-[130px] right-7 ${
                        unlockedCards.card4 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit4 * multiplier4).toLocaleString("en-IN")}
                    </p>
                    <div
                      className={`absolute flex flex-col items-start justify-start gap-6 top-[135px] left-[124px] z-5 w-[508px] ${
                        unlockedCards.card4 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <label className="text-white font-medium text-[20px]">
                          Investment Multiplier ({multiplier4}x)
                        </label>
                        <Box sx={{ width: "100%" }}>
                          <Slider
                            aria-label="Zoom"
                            value={multiplier4}
                            onChange={(e, val) => setMultiplier4(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "16px",
                                marginTop: "-2px",
                              },
                            }}
                          />
                        </Box>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-3">
                        <div className="flex justify-between items-center p-3 bg-[#55EF3D1A] rounded-[13px] w-[508px]">
                          <p className="font-semibold text-[20px] leading-[29px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-2 px-4 text-[24px] leading-[160%] text-[#4EFF32] font-semibold">
                            ₹
                            {(baseProfit4 * multiplier4).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[12px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-[508px]">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Responsive view */}
      {activeButton === "Bullish" && (
        <>
          {/* Card 1: Nifty 50 Index Options */}
          <div className="md:hidden flex flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] text-center font-degular">
              Nifty 50 Index Options
            </p>
            <div className="flex flex-col items-center justify-center relative mt-4">
              <img
                src={algocard1}
                alt="algocard1"
                className="w-full object-cover"
              />
              <div className="relative">
                <img src={line1} alt="line" className="object-cover w-full" />
                <img
                  src={
                    activeTab2 === "overview"
                      ? bullishmomentumoverview
                      : activeTab2 === "monthly"
                      ? bullishniftymonthlystats
                      : cardbg
                  }
                  alt="linecard"
                  className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                    unlockedCards.card1 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card1 && (
                  <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center md:gap-4 gap-3 p-4">
                    <img
                      src={lockicon}
                      alt="lockicon"
                      className="w-[55px] object-cover"
                    />
                    <p className="font-semibold md:text-[20px] text-[12px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold md:text-[26px] text-[16px] leading-[130%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br className="md:block hidden" />{" "}
                      performance metrics.
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
                {unlockedCards.card1 && (
                  <div className="flex justify-center items-center w-full">
                    <div
                      className="absolute top-[60px] p-1 flex justify-between items-center w-[335px] rounded-[10px] font-sans"
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
                  </div>
                )}
                {unlockedCards.card1 && activeTab2 === "pl" && (
                  <div className="flex justify-center items-center">
                    <div
                      className={`absolute flex flex-col items-center justify-center gap-0 top-[125px] z-5 w-[330px] ${
                        unlockedCards.card1 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-0 w-full h-[70px] px-2">
                        <label className="text-white font-semibold text-[12.5px] leading-[12px]">
                          Investment Multiplier ({multiplier1}x)
                        </label>
                        <div className="w-full">
                          <Slider
                            aria-label="Zoom"
                            value={multiplier1}
                            onChange={(e, val) => setMultiplier1(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                                width: 14,
                                height: 14,
                              },
                              "& .MuiSlider-mark": {
                                width: 6,
                                height: 6,
                                backgroundColor: "#FFFFFF",
                                borderRadius: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                              },
                              "& .MuiSlider-markActive": {
                                width: 6,
                                height: 6,
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "9px",
                                marginTop: "-6px",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <div className="flex justify-between items-center p-2 bg-[#55EF3D1A] rounded-[13px] w-full h-[43px]">
                          <p className="font-semibold text-[12.5px] leading-[18px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-1 px-4 text-[15px] leading-[160%] text-[#4EFF32] font-bold">
                            ₹
                            {(baseProfit1 * multiplier1).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[7.4px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-full">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                    <p
                      className={`rounded-[10px] bg-[#00000042] py-1 px-4 text-[15px] leading-[160%] text-white font-bold absolute top-[115px] right-4 ${
                        unlockedCards.card1 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit1 * multiplier1).toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Bank Nifty Index Options */}
          <div className="md:hidden flex flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] text-center font-degular">
              Bank Nifty Index Options
            </p>
            <div className="flex flex-col items-center justify-center relative mt-4">
              <img
                src={algocard2}
                alt="algocard2"
                className="w-full object-cover"
              />
              <div className="relative">
                <img src={line1} alt="line" className="object-cover w-full" />
                <img
                  src={
                    activeTab === "overview"
                      ? bullishbanckniftyoverview
                      : activeTab === "monthly"
                      ? bullishbankniftymummonthlystats
                      : cardbg
                  }
                  alt="indexfuture1"
                  className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                    unlockedCards.card2 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card2 && (
                  <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center md:gap-4 gap-3 p-4">
                    <img
                      src={lockicon}
                      alt="lockicon"
                      className="w-[55px] object-cover"
                    />
                    <p className="font-semibold md:text-[20px] text-[12px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold md:text-[26px] text-[16px] leading-[130%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br className="md:block hidden" />{" "}
                      performance metrics.
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
                {unlockedCards.card2 && (
                  <div className="flex justify-center items-center w-full">
                    <div
                      className="absolute top-[60px] p-1 flex justify-between items-center w-[335px] rounded-[10px] font-sans"
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
                  </div>
                )}
                {unlockedCards.card2 && activeTab === "pl" && (
                  <div className="flex justify-center items-center">
                    <div
                      className={`absolute flex flex-col items-center justify-center gap-0 top-[125px] z-5 w-[330px] ${
                        unlockedCards.card2 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-0 w-full h-[70px] px-2">
                        <label className="text-white font-semibold text-[12.5px] leading-[12px]">
                          Investment Multiplier ({multiplier2}x)
                        </label>
                        <div className="w-full">
                          <Slider
                            aria-label="Zoom"
                            value={multiplier2}
                            onChange={(e, val) => setMultiplier2(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                                width: 14,
                                height: 14,
                              },
                              "& .MuiSlider-mark": {
                                width: 6,
                                height: 6,
                                backgroundColor: "#FFFFFF",
                                borderRadius: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                              },
                              "& .MuiSlider-markActive": {
                                width: 6,
                                height: 6,
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "9px",
                                marginTop: "-6px",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <div className="flex justify-between items-center p-2 bg-[#55EF3D1A] rounded-[13px] w-full h-[43px]">
                          <p className="font-semibold text-[12.5px] leading-[18px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-1 px-4 text-[15px] leading-[160%] text-[#4EFF32] font-bold">
                            ₹
                            {(baseProfit2 * multiplier2).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[7.4px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-full">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                    <p
                      className={`rounded-[10px] bg-[#00000042] py-1 px-4 text-[15px] leading-[160%] text-white font-bold absolute top-[115px] right-4 ${
                        unlockedCards.card2 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit2 * multiplier2).toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {activeButton === "Bearish" && (
        <>
          {/* Card 3: Nifty 50 Index Futures */}
          <div className="md:hidden flex flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] text-center font-degular">
              Nifty 50 Index Futures
            </p>
            <div className="flex flex-col items-center justify-center relative mt-4">
              <img
                src={algocard1}
                alt="algocard1"
                className="w-full object-cover"
              />
              <div className="relative">
                <img src={line1} alt="line" className="object-cover w-full" />
                <img
                  src={
                    activeTab1 === "overview"
                      ? bearishhniftyoverview
                      : activeTab1 === "monthly"
                      ? bearishniftymonthlystats
                      : cardbg
                  }
                  alt="plimage"
                  className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                    unlockedCards.card3 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card3 && (
                  <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center md:gap-4 gap-3 p-4">
                    <img
                      src={lockicon}
                      alt="lockicon"
                      className="w-[55px] object-cover"
                    />
                    <p className="font-semibold md:text-[20px] text-[12px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold md:text-[26px] text-[16px] leading-[130%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br className="md:block hidden" />{" "}
                      performance metrics.
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
                {unlockedCards.card3 && (
                  <div className="flex justify-center items-center w-full">
                    <div
                      className="absolute top-[60px] p-1 flex justify-between items-center w-[335px] rounded-[10px] font-sans"
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
                  </div>
                )}
                {unlockedCards.card3 && activeTab1 === "pl" && (
                  <div className="flex justify-center items-center">
                    <div
                      className={`absolute flex flex-col items-center justify-center gap-0 top-[125px] z-5 w-[330px] ${
                        unlockedCards.card3 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-0 w-full h-[70px] px-2">
                        <label className="text-white font-semibold text-[12.5px] leading-[12px]">
                          Investment Multiplier ({multiplier3}x)
                        </label>
                        <div className="w-full">
                          <Slider
                            aria-label="Zoom"
                            value={multiplier3}
                            onChange={(e, val) => setMultiplier3(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                                width: 14,
                                height: 14,
                              },
                              "& .MuiSlider-mark": {
                                width: 6,
                                height: 6,
                                backgroundColor: "#FFFFFF",
                                borderRadius: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                              },
                              "& .MuiSlider-markActive": {
                                width: 6,
                                height: 6,
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "9px",
                                marginTop: "-6px",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <div className="flex justify-between items-center p-2 bg-[#55EF3D1A] rounded-[13px] w-full h-[43px]">
                          <p className="font-semibold text-[12.5px] leading-[18px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-1 px-4 text-[15px] leading-[160%] text-[#4EFF32] font-bold">
                            ₹
                            {(baseProfit3 * multiplier3).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[7.4px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-full">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                    <p
                      className={`rounded-[10px] bg-[#00000042] py-1 px-4 text-[15px] leading-[160%] text-white font-bold absolute top-[115px] right-4 ${
                        unlockedCards.card3 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit3 * multiplier3).toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Bank Nifty Index Futures */}
          <div className="md:hidden flex flex-col justify-center items-center gap-4 mt-8">
            <p className="font-semibold md:text-[48px] text-[24px] leading-[100%] text-center font-degular">
              Bank Nifty Index Futures
            </p>
            <div className="flex flex-col items-center justify-center relative mt-4">
              <img
                src={algocard3}
                alt="algocard3"
                className="w-full object-cover"
              />
              <div className="relative">
                <img src={line1} alt="line" className="object-cover w-full" />
                <img
                  src={
                    activeTab3 === "overview"
                      ? bearishhbanckniftyoverview
                      : activeTab3 === "monthly"
                      ? bearishbankniftymonthlystats
                      : cardbg
                  }
                  alt="cardbg"
                  className={`object-cover absolute w-full left-0 top-[42px] p-2 transition-all duration-300 ${
                    unlockedCards.card4 ? "blur-0" : "blur-md"
                  }`}
                />
                {!unlockedCards.card4 && (
                  <div className="absolute inset-0 flex flex-col top-6 left-2 justify-center items-center md:gap-4 gap-3 p-4">
                    <img
                      src={lockicon}
                      alt="lockicon"
                      className="w-[55px] object-cover"
                    />
                    <p className="font-semibold md:text-[20px] text-[12px] leading-[100%] text-[#FFFFFFBF]">
                      View Backtest Data
                    </p>
                    <p className="font-semibold md:text-[26px] text-[16px] leading-[130%] text-white text-center">
                      <span className="bg-[linear-gradient(92.85deg,_#3FEFFF_-1.87%,_#184ABE_65.54%)] bg-clip-text text-transparent">
                        Unlock
                      </span>{" "}
                      backtest results and <br className="md:block hidden" />{" "}
                      performance metrics.
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
                {unlockedCards.card4 && (
                  <div className="flex justify-center items-center w-full">
                    <div
                      className="absolute top-[60px] p-1 flex justify-between items-center w-[335px] rounded-[10px] font-sans"
                      style={{
                        background:
                          "linear-gradient(92.7deg, rgba(63, 173, 255, 0.2) 10.94%, rgba(24, 74, 190, 0.2) 104.87%)",
                      }}
                    >
                      <button
                        onClick={() => setActiveTab3("overview")}
                        className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                          activeTab3 === "overview"
                            ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                            : "bg-transparent"
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab3("monthly")}
                        className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                          activeTab3 === "monthly"
                            ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                            : "bg-transparent"
                        }`}
                      >
                        Monthly Stats
                      </button>
                      <button
                        onClick={() => setActiveTab3("pl")}
                        className={`flex-1 p-2 rounded-[5px] text-white text-[12px] leading-[18px] text-center transition-all duration-300 ease-in-out ${
                          activeTab3 === "pl"
                            ? "bg-[linear-gradient(141.14deg,_#3FADFF_7.75%,_#336CDC_49.32%,_#47B4B4_91.74%)]"
                            : "bg-transparent"
                        }`}
                      >
                        P&L Calculator
                      </button>
                    </div>
                  </div>
                )}
                {unlockedCards.card4 && activeTab3 === "pl" && (
                  <div className="flex justify-center items-center">
                    <div
                      className={`absolute flex flex-col items-center justify-center gap-0 top-[125px] z-5 w-[330px] ${
                        unlockedCards.card4 ? "blur-0" : "blur-md"
                      }`}
                    >
                      <div className="flex flex-col justify-start items-start gap-0 w-full h-[70px] px-2">
                        <label className="text-white font-semibold text-[12.5px] leading-[12px]">
                          Investment Multiplier ({multiplier4}x)
                        </label>
                        <div className="w-full">
                          <Slider
                            aria-label="Zoom"
                            value={multiplier4}
                            onChange={(e, val) => setMultiplier4(val)}
                            getAriaValueText={valuetext}
                            step={1}
                            min={1}
                            max={3}
                            marks={marks}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#4EFF32",
                              "& .MuiSlider-track": {
                                backgroundColor: "#4EFF32",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#FFFFFF33",
                              },
                              "& .MuiSlider-thumb": {
                                color: "#FFFFFF",
                                border: "2px solid #FFFFFF",
                                width: 14,
                                height: 14,
                              },
                              "& .MuiSlider-mark": {
                                width: 6,
                                height: 6,
                                backgroundColor: "#FFFFFF",
                                borderRadius: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                              },
                              "& .MuiSlider-markActive": {
                                width: 6,
                                height: 6,
                              },
                              "& .MuiSlider-markLabel": {
                                color: "#FFFFFF80",
                                fontSize: "9px",
                                marginTop: "-6px",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <div className="flex justify-between items-center p-2 bg-[#55EF3D1A] rounded-[13px] w-full h-[43px]">
                          <p className="font-semibold text-[12.5px] leading-[18px] text-white">
                            1 Year Backtest Profit & Loss
                          </p>
                          <p className="bg-[#55EF3D1A] rounded-[10px] py-1 px-4 text-[15px] leading-[160%] text-[#4EFF32] font-bold">
                            ₹
                            {(baseProfit4 * multiplier4).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                        <p className="font-medium text-[7.4px] leading-[160%] bg-[#0000006E] py-2 px-4 rounded-[6px] text-white w-full">
                          Disclaimer: Past performance or backtest data is not
                          indicative of future returns.
                        </p>
                      </div>
                    </div>
                    <p
                      className={`rounded-[10px] bg-[#00000042] py-1 px-4 text-[15px] leading-[160%] text-white font-bold absolute top-[115px] right-4 ${
                        unlockedCards.card4 ? "blur-0" : "blur-md"
                      }`}
                    >
                      ₹{(baseProfit4 * multiplier4).toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Dialog Box */}
      <UnlockDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onContinue={handleViewImageClick}
      />
    </div>
  );
};

export default Strategies;
